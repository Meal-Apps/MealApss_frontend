import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/auth/manager/Login'
import Register from './pages/auth/manager/Register'
import axios from 'axios'

function App() {
  const [count, setCount] = useState(0)
  axios.defaults.baseURL = "http://127.0.0.1:8000/api/";

  return (
    <Routes>
      <Route exact path='/' element={<Home/>}></Route>
      <Route exact path='/manager-login' element={<Login/>}></Route>
      <Route exact path='/manager-register' element={<Register/>}></Route>
    </Routes>
  )
}

export default App
