import { Children, createContext, useContext, useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";
import axios from 'axios';


axios.defaults.withCredentials = true;
 // it will send the cookies all to backend in request
 
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({children}) =>{

    const currency = import.meta.env.VITE_CURRENCY;
     
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isSeller, setIsSeller] = useState(false)
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [searchQuery,setSearchQuery] = useState({});

     
    // Fetch Seller Status 
    const fetchSeller = async() =>{
        try {
            const {data} = await axios.get('api/seller/is-auth',{
                withCredentials: true
            });
            if(data.success){
                setIsSeller(true);
            }else{
                setIsSeller(false);
            }
        } catch (error) {
            setIsSeller(false);
            
        }
    }
    

    // Fetch User Auth stauts , User Data and Cart Items

    const fetchUser = async ()=>{
        try {
            const {data} = await axios.get('/api/user/is-auth');
            if(data.success){
                setUser(data.user)
                setCartItems(data.user.cartItems)


            }
        } catch (error) {
            setUser(null)
          
            
        }
    }


    const fetchProducts = async ()=>{
        try {
            const {data} = await axios.get('/api/product/list');
            if(data.success){
               setProducts(data.products)
            }else{
                toast.error(data.message)
                console.log("yha error aa rhi hai");
                
            }
            
        } catch (error) {
            toast.error(error.message);
            
        }
    }

    // add product to cart
    const addToCart = (itemId) =>{
        let cartData = structuredClone(cartItems);
        if( cartData[itemId]){
            cartData[itemId] +=1;
        }
        else{
            cartData[itemId] =1 ;

        }

        setCartItems(cartData);
         toast.success("Added to cart");
    }

    const updateCartItem = (itemId , quantity) =>{
        let cartData = structuredClone(cartItems);
        cartData[itemId] =quantity;
        setCartItems(cartData)
        toast.success("Cart Updated");
    }

    // remove product from cart

     const removeFromCart = (itemId) =>{
        let cartData = structuredClone(cartItems);
        if( cartData[itemId]){
            cartData[itemId] -= 1;

            if( cartData[itemId] === 0){
                delete cartData[itemId];
            }
        }

        toast.success("Removed from Cart")
        setCartItems(cartData);
     }

     // 1:41:12;


     const getCartCount = ()=>{
        let totalCount = 0;
        for( let item in cartItems){
            totalCount += cartItems[item]
        }
        return totalCount;
     }

    //  const getCartAmount =() =>{
    //     let totalAmount = 0;
    //     for(let items in cartItems){
    //         let iteminfo = products.find((product) => product._id === items);
    //         if(cartItems[items]>0){
    //             totalAmount +=iteminfo.offerPrice *cartItems[items];
    //         }
    //     }
    //     return Math.floor(totalAmount*100)/100;
    //  }

    const getCartAmount = () => {
    let totalAmount = 0;
    for (let itemId in cartItems) {
        let iteminfo = products.find((product) => product._id === itemId);
        if (iteminfo && cartItems[itemId] > 0) {
            totalAmount += iteminfo.offerPrice * cartItems[itemId];
        }
    }
    return Math.floor(totalAmount * 100) / 100;
};



    useEffect (()=>{
        fetchProducts()
        fetchSeller()
        fetchUser()
    },[])

  
    // save cart in database

  useEffect(()=>{
        const  updateCart = async ()=>{
            try {
                const {data} = await axios.post("/api/cart/update", { userId:user._id,cartItems})
                if(!data.success){
                   toast.error(data.message)
                } 
            } catch (error) {
                toast.error(error.message)
                
            }
        }
       
        if (user && user._id) {
    updateCart();
}
   }, [cartItems])


    const value = {navigate, user, setUser , setCartItems,setIsSeller, isSeller ,showUserLogin , setShowUserLogin , products,currency ,addToCart,updateCartItem,removeFromCart,cartItems,setSearchQuery,searchQuery,getCartAmount,getCartCount,axios,fetchProducts}
    
    

    return <AppContext.Provider value = {value}>
        {children}
    </AppContext.Provider>
}

export const useAppContext = () =>{
    return useContext(AppContext);
}