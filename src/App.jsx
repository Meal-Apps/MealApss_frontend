import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/auth/manager/Login'
import Register from './pages/auth/manager/Register'
import axios from 'axios'
import ManagerDashLayout from './pages/ManagerDashboard/ManagerDashLayout'
import ManagerDashboard from './pages/ManagerDashboard/ManagerDashboard'
import ManagerOutlet from './pages/auth/outlet/ManagerOutlet'
import Allexpenses from './pages/auth/manager/Allexpenses'
import AllBalances from './pages/auth/manager/AllBalances'
import AllUser from './pages/auth/manager/AllUser'
import CreateUser from './pages/auth/manager/CreateUser'
import UserLogin from './pages/auth/user/UserLogin'
import UserDashboard from './pages/UserDashboard/UserDashboard'
import UserOutlet from './pages/auth/outlet/UserOutlet'
import AllUserExpenses from './pages/auth/user/AllUserExpenses'
import AllUserBalance from './pages/auth/user/AllUserBalance'

function App() {
  const [count, setCount] = useState(0)
  axios.defaults.baseURL = "http://127.0.0.1:8000/api/";

  return (
    <Routes>
      <Route exact path='/' element={<Home/>}></Route>
      <Route exact path='/manager-login' element={<Login/>}></Route>
      <Route exact path='/user-login' element={<UserLogin/>}></Route>
      <Route exact path='/manager-register' element={<Register/>}></Route>
      

      <Route exact path='*' element={<UserOutlet/>}>
      <Route exact path='user/dashboard' element={<UserDashboard/>}></Route>
      <Route exact path='user/expenses' element={<AllUserExpenses/>}></Route>
      <Route exact path='user/balance' element={<AllUserBalance/>}></Route>
      </Route>
      <Route exact path='*' element={<ManagerOutlet/>}>
        <Route exact path='manager/dashboard' element={<ManagerDashboard/>}></Route>
        <Route exact path='manager/expenses' element={<Allexpenses/>}></Route>
        <Route exact path='manager/balance' element={<AllBalances/>}></Route>
        <Route exact path='manager/alluser' element={<AllUser></AllUser>}></Route>
        <Route exact path='manager/createuser' element={<CreateUser/>}></Route>
      </Route>
    </Routes>
  )
}

export default App
