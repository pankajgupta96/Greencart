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

function App() {
  const issellerpath = useLocation().pathname.includes("seller");
  const {showUserLogin} = useAppContext();
  
  
   return (
    <div >
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

      </Routes>
   </div>

   {!issellerpath && <Footer/>}
     
    </div>

  
  )
}

export default App