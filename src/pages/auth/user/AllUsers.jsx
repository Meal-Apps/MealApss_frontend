import React, { useEffect, useState } from 'react'
import UserDashboardLayout from '../../UserDashboard/UserDashboardLayout';
import axios from 'axios';

function AllUsers() {
    const [users,setAllUsers] = useState();
    const token = JSON.parse(localStorage.getItem('manager'));
    useEffect(() => {
        axios.get('getallusers',{
            headers : {
                Authorization: 'Bearer ' + token?.access_token,
            }
        })
        .then((res) => {
            setAllUsers(res.data)
        })
        .catch((err) => {
           
        })
    },[])
    console.log(users)
  return (
    <UserDashboardLayout>
         <div className='p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14'>
    
    <div className=' mb-4 rounded bg-gray-50 dark:bg-gray-800'>
      
    <h2 className="text-lg p-2 font-semibold">All User</h2>
  
  
     <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
<div className="flex flex-col sm:flex-row flex-wrap space-y-4 px-4 sm:space-y-0 items-center justify-between pb-4">
   
  
   <div className="relative flex items-center">
       
      
   </div>
   
</div>
<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
   <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
       <tr>
         
           <th scope="col" className="px-6 py-3">Name</th>
           <th scope="col" className="px-6 py-3">Date</th>
           <th scope="col" className="px-6 py-3">Email</th>
         
           
       </tr>
   </thead>
   <tbody>
   {
       users?.users?.length > 0 ? (users?.users?.map(item => ( 
         <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={item?.id}>
           <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item?.name}</th>
           <td className="px-6 py-4">{new Date(item.created_at).toLocaleDateString()}</td>
           <td className="px-6 py-4">{item?.email}</td>
           
         </tr>
       ))) : (
         <>
         <h1>data not found</h1>
         </>
       )
      }
       
   </tbody>
</table>
</div>
    </div>
   
    </div>
    </UserDashboardLayout>
  )
}

export default AllUsers