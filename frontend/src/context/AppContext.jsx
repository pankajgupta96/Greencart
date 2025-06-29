import { Children, createContext, useContext, useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const AppContextProvider = ({children}) =>{

    const currency = import.meta.VITE_CURRENCY;
     
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isSeller, setIsSeller] = useState(false)
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [searchQuery,setSearchQuery] = useState({});



    const fetchProducts = async ()=>{
        setProducts(dummyProducts);
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

    const updateCartitem = (itemId , quantity) =>{
        let rcatData = structuredClone(cartItems);
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

     const getCartAmount =() =>{
        let totalAmount = 0;
        for(let item in cartItems){
            let iteminfo = products.find((product) => product._id === item);
            if(cartItems[item]>0){
                totalAmount +=iteminfo.offerPrice *cartItems[item];
            }
        }
        return Math.floor(totalAmount*100)
     }


    useEffect (()=>{
        fetchProducts()
    },[])


    const value = {navigate, user, setUser , setIsSeller, isSeller ,showUserLogin , setShowUserLogin , products,currency ,addToCart,updateCartitem,removeFromCart,cartItems,setSearchQuery,searchQuery,getCartAmount,getCartCount}
    
    

    return <AppContext.Provider value = {value}>
        {children}
    </AppContext.Provider>
}

export const useAppContext = () =>{
    return useContext(AppContext);
}