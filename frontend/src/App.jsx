import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Sidebar from './components/layout/Sidebar'


const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/sidebar' element={<Sidebar/>}/>

      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
