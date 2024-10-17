import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';




function Login() {
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  const [error,setError] = useState()
  const historys = useNavigate();
  useEffect(() => {
    document.title = "Login Manager | Meal Management";
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(email,password);
    axios.post('login',{
      email : email,
      password : password
    }).then((response) => {
      console.log(response);
      var userDatas = {
        access_token: response?.data?.token, 
         
        name: response?.data?.name,
        meal_name : response?.data?.meal_name,
        email: response?.data?.email,
        
        
      }  
      localStorage.setItem('manager',JSON.stringify(userDatas));
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access_token;
      historys('/manager/dashboard')
    }).catch((err) => {
      // console.log(err)
      if(err.response.status == 422){
        setError(err.response.data.errors)
    }
    else{
        setError(err.response.data)
    }
      console.log(error)
    })  
  }

  return (
    <>
    <div className="min-h-screen  py-6 flex flex-col justify-center sm:py-12">
  <div className="relative py-3 sm:max-w-xl sm:mx-auto">
    <div
      className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
    </div>
    <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">

      <div className="max-w-md mx-auto">
        <div>
          <h1 className="text-2xl font-semibold">Login</h1>
        </div>
        <div className="divide-y divide-gray-200">
          <form  method="post" onSubmit={(e) => handleSubmit(e)}>
          <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
            <div className="relative">
              <input autocomplete="off" value={email} onChange={(e) => setEmail(e.target.value)} id="email" name="email" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" />
              <label for="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email Address</label>
              {error && <p className="text-red-700">{error.email}</p>}
            </div>
            <div className="relative">
              <input autocomplete="off" value={password} onChange={(e) => setPassword(e.target.value)} id="password" name="password" type="password" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" />
              <label for="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
              {error && <p className="text-red-700">{error.password}</p>}
            </div>
            <div className="relative">
              <button className="bg-cyan-500 text-white rounded-md px-2 py-1">Submit</button>
              {error?.message && <p className="text-red-700">{error?.message}</p>}
            </div>
          </div>
          </form>
        </div>
      </div>

      <div className="w-full flex justify-center">
        
      
        <div>No Account <Link to='/manager-register' className='text-cyan-600'>Create One!</Link></div>
      </div>

    </div>
  </div>
</div>
    </>
  )
}

export default Login
