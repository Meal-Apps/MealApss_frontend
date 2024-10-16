import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function Register() {
    const [name,setName] = useState();
    const [email,setEmail] = useState()
    const [mealName,setMealname] = useState()
    const [password,setPassword] = useState()
    const [error,setError] = useState()
  useEffect(() => {
    document.title = "Register Manager | Meal Management";
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
    console.log(name,email,mealName,password);
    axios.post('/register',{
      name :name,
      email: email,
      meal_name: mealName,
      password : password
    })
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
      if(error.response.status == 422){
        setError(error.response.data.errors)
    }
    else{
        setError(error.response.data)
    }
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
        <form method='post' onSubmit={(e) => submitForm(e)}>
        <div className="divide-y divide-gray-200">
          <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
          <div className="relative">
              <input autocomplete="off" id="name" value={name} onChange={(e) => setName(e.target.value)} name="name" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Your Name" />
              <label for="name" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Your Name</label>
              {error && <p className="text-red-700">{error.name}</p>}
            </div>
            <div className="relative">
              <input autocomplete="off" value={email} onChange={(e) => setEmail(e.target.value)} id="email" name="email" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" />
              <label for="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email Address</label>
              {error && <p className="text-red-700">{error.email}</p>}
            </div>
            <div className="relative">
              <input autocomplete="off" value={mealName} onChange={(e) => setMealname(e.target.value)} id="mealname" name="mealname" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Enter Meal Name" />
              <label for="mealname" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Enter Meal Name</label>
              {error && <p className="text-red-700">{error.meal_name}</p>}
            </div>
            <div className="relative">
              <input autocomplete="off" value={password} onChange={(e) => setPassword(e.target.value)} id="password" name="password" type="password" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" />
              <label for="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
              {error && <p className="text-red-700">{error.password}</p>}
            </div>
            <div className="relative">
              <button className="bg-cyan-500 text-white rounded-md px-2 py-1">Submit</button>
            </div>
          </div>
        </div>
        </form>
      </div>

      <div className="w-full flex justify-center">
        
        <div>You Have a Account <Link to={'/manager-login'} classNameName='text-cyan-600'>Login Here!</Link></div>
      </div>

    </div>
  </div>
</div>
    </>
  )
}

export default Register