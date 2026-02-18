import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Sidebar from './components/layout/Sidebar'
import VerifyEmail from './pages/VerifyEmail'
import AddFood from './components/food/AddFood'
import Foods from './components/food/Foods'


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/sidebar' element={<Sidebar />} />
          <Route path='/verify/:token' element={<VerifyEmail />} />
          <Route path='/addFood' element={<AddFood/>}/>
          <Route path='/foods' element={<Foods/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
