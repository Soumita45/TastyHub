import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Sidebar from './components/layout/Sidebar'
import VerifyEmail from './pages/VerifyEmail'


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/sidebar' element={<Sidebar />} />
          <Route path='/verify/:token' element={<VerifyEmail />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
