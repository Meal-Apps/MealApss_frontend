import React, { useEffect, useState } from 'react'
import ManagerDashLayout from './ManagerDashLayout'
import axios from 'axios'
import ManagerExpense from '../../componets/Manager/ManagerExpense';
import ManagerBalance from '../../componets/Manager/ManagerBalance';

function ManagerDashboard() {
   const [managerInfo,setManagerInfo] = useState()
   const token = JSON.parse(localStorage.getItem('manager'));
   console.log(token)
   useEffect(() => {
      axios.get('getManagers',{
         headers : {
            Authorization : 'Bearer ' + token?.access_token
         }
      })
      .then((response) => {
         setManagerInfo(response?.data)
         console.log(response)
      })
      .catch((err) => {
         console.log(err)
      })
   },[])
   console.log(managerInfo)
  return (
    <ManagerDashLayout>
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
         
<div class="grid grid-cols-1 gap-4 px-4 mb-4 mt-8 sm:grid-cols-4 sm:px-8">
    <div class="flex items-center bg-white border rounded-sm overflow-hidden shadow">
        <div class="p-4 bg-green-400">
        <svg xmlns="http://www.w3.org/2000/svg" stroke="currentColor" viewBox="0 0 24 24" class="h-12 w-12 text-white" fill="none">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z">
                </path>
</svg>

        </div>
        <div class="px-4 text-gray-700">
            <h3 class="text-sm tracking-wider">Total Member</h3>
            <p class="text-3xl">{managerInfo?.users.length}</p>
        </div>
    </div>
    <div class="flex items-center bg-white border rounded-sm overflow-hidden shadow">
        <div class="p-4 bg-blue-400"><svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-white" 
                viewBox="0 0 384 512" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M36 32.3C18.4 30.1 2.4 42.5 .2 60S10.5 93.6 28 95.8l7.9 1c16 2 28 15.6 28 31.8L64 160l-32 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l32 0 0 160c0 53 43 96 96 96l32 0c106 0 192-86 192-192l0-32c0-53-43-96-96-96l-16 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l16 0c17.7 0 32 14.3 32 32l0 32c0 70.7-57.3 128-128 128l-32 0c-17.7 0-32-14.3-32-32l0-160 32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-32 0 0-31.5c0-48.4-36.1-89.3-84.1-95.3l-7.9-1z"/>
            </svg></div>
        <div class="px-4 text-gray-700">
            <h3 class="text-sm tracking-wider">Total Balance</h3>
            <p class="text-3xl">{managerInfo?.totalBalance}</p>
        </div>
    </div>
    <div class="flex items-center bg-white border rounded-sm overflow-hidden shadow">
        <div class="p-4 bg-indigo-400">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-white"  stroke="currentColor"  viewBox="0 0 384 512">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M36 32.3C18.4 30.1 2.4 42.5 .2 60S10.5 93.6 28 95.8l7.9 1c16 2 28 15.6 28 31.8L64 160l-32 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l32 0 0 160c0 53 43 96 96 96l32 0c106 0 192-86 192-192l0-32c0-53-43-96-96-96l-16 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l16 0c17.7 0 32 14.3 32 32l0 32c0 70.7-57.3 128-128 128l-32 0c-17.7 0-32-14.3-32-32l0-160 32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-32 0 0-31.5c0-48.4-36.1-89.3-84.1-95.3l-7.9-1z"/>
        </svg>
        </div>
        <div class="px-4 text-gray-700">
            <h3 class="text-sm tracking-wider">Current Balance</h3>
            <p class="text-3xl">{managerInfo?.currentBalance}</p>
        </div>
    </div>
    <div class="flex items-center bg-white border rounded-sm overflow-hidden shadow">
        <div class="p-4 bg-red-400"><svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-white" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path fill-rule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z" clip-rule="evenodd" />
            </svg></div>
        <div class="px-4 text-gray-700">
            <h3 class="text-sm tracking-wider">Expense</h3>
            <p class="text-3xl">{managerInfo?.totalExpenses}</p>
        </div>
    </div>
</div>


            
            <div className="grid  grid-cols-1  gap-4 mb-4 sm:grid-cols-2 ">
               <div className='bg-gray-50 rounded  dark:bg-gray-800'>
                  <ManagerBalance/>
               </div>
               <div className='bg-gray-50 rounded  dark:bg-gray-800'>
                  <ManagerExpense/>
               </div>
            </div>
           
            <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
               <div>
               <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <div className="flex flex-col sm:flex-row flex-wrap space-y-4 px-4 sm:space-y-0 items-center justify-between pb-4">
       
       
        <div className="relative flex items-center">
            
            TotalUser : {managerInfo?.users.length}
        </div>
        
    </div>
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              
                <th scope="col" className="px-6 py-3">Name</th>
                <th scope="col" className="px-6 py-3">Date</th>
                <th scope="col" className="px-6 py-3">Amount</th>
                
            </tr>
        </thead>
        <tbody>
        {
            managerInfo?.users?.length > 0 ? ( managerInfo?.users?.map(item => ( 
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={item?.id}>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item?.name}</th>
                <td className="px-6 py-4">{new Date(item.created_at).toLocaleDateString()}</td>
                <td className="px-6 py-4">{item?.id}</td>
              </tr>
            )) ) : (
              <>
              <h1>no data</h1>
              </>
            )
           }
            
        </tbody>
    </table>
</div>
               </div>
               <div></div>
            </div>
            
         </div>
    </ManagerDashLayout>
  )
}

export default ManagerDashboard