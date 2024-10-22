import React, { useEffect, useState } from 'react'
import UserDashboardLayout from '../../UserDashboard/UserDashboardLayout';
import axios from 'axios';

function AllUserBalance() {
    const [balancesInfo,setbalancesInfo] = useState()
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('current'); 
    
    const token = JSON.parse(localStorage.getItem('manager'));
    const toggleDropdown = () => {
        setDropdownOpen(prev => !prev);
      };
      const handleOptionChange = (option) => {
        setSelectedOption(option); 
        setDropdownOpen(false); 
      };
      useEffect(() => {
        axios.get('getallbalance/'+ selectedOption,{
            headers: {
              Authorization : 'Bearer ' + token?.access_token
            }
          })
          .then(response => {
            setbalancesInfo(response?.data)
          })
          .catch((err) => {
            console.log(err)
          })
       
      },[selectedOption])
  return (
    <UserDashboardLayout>
         <div className='p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14'>
    
    <div className=' mb-4 rounded bg-gray-50 dark:bg-gray-800'>
      
    <h2 className="text-lg p-2 font-semibold">All Balance</h2>
    
  
     <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
<div className="flex flex-col sm:flex-row flex-wrap space-y-4 px-4 sm:space-y-0 items-center justify-between pb-4">
   <div className="relative">
       <button 
           id="dropdownRadioButton" 
           data-dropdown-toggle="dropdownRadio" 
           className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" 
           type="button"
           onClick={toggleDropdown}
       >
           {selectedOption} {/* Display selected option */}
           <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
               <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
           </svg>
       </button>
     
       <div id="dropdownRadio" className={`absolute z-10 ${dropdownOpen ? 'block' : 'hidden'} w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}>
           <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownRadioButton">
               
                   <li>
                       <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                           <input 
                               id='current' 
                               type="radio" 
                               value='current'
                               name="filter-radio" 
                               checked={selectedOption === 'current'} 
                               onChange={() => handleOptionChange('current')} 
                               className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                           />
                           <label htmlFor='current' className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">this month</label>
                       </div>
                   </li>
                   <li >
                       <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                           <input 
                               id='previous' 
                               type="radio" 
                               value='previous'
                               name="filter-radio" 
                               checked={selectedOption === 'previous'} 
                               onChange={() => handleOptionChange('previous')} 
                               className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                           />
                           <label htmlFor='previous' className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">last month</label>
                       </div>
                   </li>
             
           </ul>
       </div>
   </div>
  
   <div className="relative flex items-center">
       
       Totalbalances : {balancesInfo?.totalBalance}
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
       balancesInfo?.balances.length > 0 ? (balancesInfo.balances?.map(item => ( 
         <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={item?.id}>
           <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item?.user_name}</th>
           <td className="px-6 py-4">{new Date(item.created_at).toLocaleDateString()}</td>
           <td className="px-6 py-4">{item?.balance}</td>
          
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

export default AllUserBalance