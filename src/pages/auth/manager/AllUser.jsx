import React, { useEffect, useState } from 'react'
import ManagerDashLayout from '../../ManagerDashboard/ManagerDashLayout'
import axios from 'axios';

function AllUser() {
    const [users,setAllUsers] = useState();
    const token = JSON.parse(localStorage.getItem('manager'));
    const fetchAllUsers = () => {
        axios.get('getallusers',{
            headers : {
                Authorization: 'Bearer ' + token?.access_token,
            }
        })
        .then((res) => {
            setAllUsers(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }
    useEffect(() => {
        fetchAllUsers()
    },[])
    const handleDelete = (id) => {
        axios.delete(`deleteuser/${id}`,{
            headers : {
                Authorization : 'Bearer ' + token?.access_token,
            }
        })
        .then((res) => {
            fetchAllUsers()
        })
        .catch(err => {
            console.log(err)
        })
    }
    console.log(users)
  return (
    <ManagerDashLayout>
         <div className='p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14'>
    
    <div className=' mb-4 rounded bg-gray-50 dark:bg-gray-800'>
      
    <h2 className="text-lg p-2 font-semibold">All User</h2>
  
  
     <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
<div className="flex flex-col sm:flex-row flex-wrap space-y-4 px-4 sm:space-y-0 items-center justify-between pb-4">
   
  
   <div className="relative flex items-center">
       
       {/* Totalbalances : {balancesInfo?.totalBalance} */}
   </div>
   
</div>
<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
   <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
       <tr>
         
           <th scope="col" className="px-6 py-3">Name</th>
           <th scope="col" className="px-6 py-3">Date</th>
           <th scope="col" className="px-6 py-3">Email</th>
           <th scope="col" className="px-6 py-3">Action</th>
           
       </tr>
   </thead>
   <tbody>
   {
       users?.users?.length > 0 ? (users?.users?.map(item => ( 
         <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={item?.id}>
           <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item?.name}</th>
           <td className="px-6 py-4">{new Date(item.created_at).toLocaleDateString()}</td>
           <td className="px-6 py-4">{item?.email}</td>
           <td className="px-6 py-4">
           <button onClick={() =>{handleDelete(item?.id)}} type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">Delete</button>

           </td>
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
    </ManagerDashLayout>
  )
}

export default AllUser