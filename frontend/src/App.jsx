import React from 'react'
import Navbar from './components/Navbar'
import {Toaster} from 'react-hot-toast';

import Home from './pages/Home'
import { Route, Routes, useLocation } from 'react-router-dom'
import Footer from './components/Footer';
import { useAppContext } from './context/AppContext';
import Login from './components/Login';
import AllProducts from './pages/AllProducts';
import ProductCategrory from './pages/ProductCategrory';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import AddAddress from './pages/AddAddress';
import MyOrders from './pages/MyOrders';
import SellerLogin from './components/seller/SellerLogin';
import SellerLayout from './pages/Seller/SellerLayout';

function App() {
  const issellerpath = useLocation().pathname.includes("seller");
  const {showUserLogin,isSeller} = useAppContext();
   

  
   return (
    <div className='text-default min-h-screen text-gray-700 bg-white' >
        {
          issellerpath ? null : <Navbar/>
        }

        {showUserLogin? <Login/> : null}
     

<Toaster/>
        
   
   <div className= {`${issellerpath ? "" :'px-6 md:px-16 lg:px-24 xl:px-32'}`} >
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/products' element={<AllProducts/>}></Route>
        <Route path='/products/:category' element={<ProductCategrory/>}></Route>
        <Route path='/products/:category/:id' element={<ProductDetails/>}></Route>
        <Route path='/cart' element={<Cart/>}></Route>
        <Route path='/add-address' element={<AddAddress/>}></Route>
        <Route path='/my-orders' element={<MyOrders/>}></Route>
        <Route path='/seller' element ={isSeller ? <SellerLayout/> : <SellerLogin/> } ></Route>
      </Routes>
   </div>

   {!issellerpath && <Footer/>}
     
    </div>

  
  )
}

export default App