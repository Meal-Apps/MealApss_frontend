import React, { useState } from 'react'
import ManagerDashLayout from '../../ManagerDashboard/ManagerDashLayout'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


function CreateUser() {
    const [name,setName] = useState()
    const [password,setPassword] = useState()
    const [email,setEmail] = useState()
    const [error,setError] = useState()
    const history = useNavigate()
    const token = JSON.parse(localStorage.getItem('manager'));
    const submitUser = (e) => {
        const token = JSON.parse(localStorage.getItem('manager'));
        e.preventDefault();
        axios.post('createuser',{
            name : name,
            password : password,
            email : email
        },{
            headers : {
                Authorization : 'Bearer ' + token?.access_token
                

            }
        })
        .then((response) => {
            history('/manager/alluser')
        })
        .catch((err) =>{
         
           
            if(err.response.status == 422){
                
                setError(err.response.data.errors)
            }
            else{
                setError(err.response.data)
            }
        })
        
    }
  return (
    <ManagerDashLayout>
        <div className='p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14'>
    <h1>All balances</h1>
    <div className=' mb-4 rounded bg-gray-50 dark:bg-gray-800'>
      
    
  
  
     <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
<div className="flex flex-col sm:flex-row flex-wrap space-y-4 px-4 sm:space-y-0 items-center  pb-4">
   
  
   <div className="relative flex items-center">
       
       
   </div>
   
   <div className="   flex items-center justify-center bg-black bg-opacity-50">
                     <div className=" bg-white  p-6">
                       

                        

          
           


                         <h2 className="text-lg font-semibold">Create A New User</h2>
                      
                         <form method='post' onSubmit={(e) => submitUser(e)}>
                             
                             <input value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter User Name'  type="text" className="border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/>
                             {error && <p className="text-red-700">{error.name}</p>}
                             <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter Your Email" className="border rounded p-2 w-full mb-4" />
                             {error && <p className="text-red-700">{error.email}</p>}
                             <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter Password" className="border rounded p-2 w-full mb-4" />
                             {error && <p className="text-red-700">{error.password}</p>}


                             <button type="submit" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 px-4 py-2">Submit</button> 
                             {error?.message && <p className="text-red-700">{error?.message}</p>}
                         </form>
                     </div>
                 </div>


</div>

</div>
    </div>
   
    </div>
    </ManagerDashLayout>
  )
}

export default CreateUser