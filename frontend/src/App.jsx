import React from 'react'
import Navbar from './components/Navbar'

import Home from './pages/Home'
import { Route, Routes, useLocation } from 'react-router-dom'

function App() {
  const issellerpath = useLocation().pathname.includes("seller");
  return (
    <div >
        {
          issellerpath ? null : <Navbar/>
        }
   
   <div className= {`${issellerpath ? "" :'px-6 md:px-16 lg:px-24 xl:px-32'}`} >
      <Routes>
        <Route path='/' element={<Home/>}></Route>
      </Routes>
   </div>
     
    </div>

  
  )
}

export default App