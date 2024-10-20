import React, { useEffect, useState } from 'react'
import ManagerDashLayout from '../../ManagerDashboard/ManagerDashLayout'
import axios from 'axios';
import ExpensessModal from '../../../componets/Manager/ExpensessModal';

function Allexpenses() {
    const [expenseInfo,setexpenseInfo] = useState()
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

    const fetchBalances = () => {
      axios.get('getallexpenses/'+ selectedOption,{
        headers: {
          Authorization : 'Bearer ' + token?.access_token
        }
      })
      .then(response => {
        setexpenseInfo(response?.data)
      })
      .catch((err) => {
        console.log(err)
      })
    }
  
    useEffect(() => {
      fetchBalances()
     
    },[selectedOption])
    console.log(expenseInfo)
    console.log(expenseInfo?.expenses.length)
    console.log('djifd')
    const handleDelete = (id) =>{
        
        axios.delete(`deleteexpense/${id}`,{
          headers : {
            Authorization: 'Bearer ' + token?.access_token,
          }
        })
        .then((response) => {
          console.log(response); 
          // setProductData([])
        })
        .catch((err) => {
          console.log(err);
        }); 
    
      }
  return (
    <ManagerDashLayout>
       <div className='p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14'>
       <h1>All expenses</h1>
       <div className=' mb-4 rounded bg-gray-50 dark:bg-gray-800'>
        <h1>All Expenses</h1>
        <ExpensessModal fetchBalances={fetchBalances}/>
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
          
          TotalExpenses : {expenseInfo?.totalExpenses}
      </div>
      
  </div>
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Date</th>
              <th scope="col" className="px-6 py-3">Amount</th>
              <th scope="col" className="px-6 py-3">Action</th>
              
          </tr>
      </thead>
      <tbody>
      {
          expenseInfo?.expenses.length > 0 ? (expenseInfo.expenses?.map(item => ( 
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={item?.id}>
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item?.description}</th>
              <td className="px-6 py-4">{new Date(item.date).toLocaleDateString()}</td>
              <td className="px-6 py-4">{item?.amount}</td>
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

export default Allexpenses