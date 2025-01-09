import { data } from 'autoprefixer';
import axios from 'axios';
import React, { useState } from 'react'

function ExpensessModal({fetchBalances}) {
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [date,setDate] = useState()
    const [amount,setAmount] = useState()
    const [description,setDescription] = useState()


    const token = JSON.parse(localStorage.getItem('manager'));


    const toggleModal = () => {
        setIsModalOpen(prev => !prev); 
    };
    const submitBalance = (e) => {
        e.preventDefault();
        axios.post('addexpense',{
            amount :amount,
           description : description,
           date : date

        },{
            headers : {
                       Authorization :'Bearer ' + token?.access_token
                   }
        })
        .then((balanc) => {
           // console.log(balanc)
        //    fetchBalances();
        fetchBalances()
           setIsModalOpen(false)
        })
        .catch((err) => {
          
        })
   }
  return (
    <>
       <button 
                        onClick={toggleModal} 
                        className="text-white ml-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" 
                    >
                        Add Expenses
                    </button> 
                    {isModalOpen && (
                     <div className="modal  fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                     <div className="modal-content bg-white rounded-lg shadow-lg p-6">
                         <span className="close cursor-pointer" onClick={toggleModal}>&times;</span>

                        

          
           


                         <h2 className="text-lg font-semibold">Form Title</h2>
                      
                         <form method='post' onSubmit={(e) => submitBalance(e)}>
                             {/* Add your form fields here */}
                             <input value={date} onChange={(e) => setDate(e.target.value)}  type="date" className="border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/>
                             <input value={description} onChange={(e) => setDescription(e.target.value)} type="text" placeholder="Enter Details" className="border rounded p-2 w-full mb-4" />
                             <input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" placeholder="Enter Amount" className="border rounded p-2 w-full mb-4" />
                             <button type="submit" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 px-4 py-2">Submit</button> {/* Specific width for submit button */}
                         </form>
                     </div>
                 </div>
                )}
   
    </>
  )
}

export default ExpensessModal