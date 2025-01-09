import React, { useCallback, useEffect, useState } from 'react'

import axios from 'axios';
import  _ from 'lodash';
import { useNavigate } from 'react-router-dom';

function BalanceModal({ fetchBalances }) {
    const histoyr = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false); 

    const [query, setQuery] = useState('');
    const [userId,setUserId] = useState()
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [balance,setBalance] = useState()
    const [error, setError] = useState(null);
    const token = JSON.parse(localStorage.getItem('manager'));
    const [page, setPage] = useState(1);
    const toggleModal = () => {
        setIsModalOpen(prev => !prev); // Toggle modal visibility
    };

    const debouncedSearch = useCallback(
        _.debounce(async (searchTerm) => {
            if (searchTerm.length < 2) {
                setProducts([]);
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const response = await axios.get('usersearch', {
                    params: { query: searchTerm },
                    headers : {
                        Authorization :'Bearer ' + token?.access_token
                    }
                });
                setUsers(response.data.data);
                setLoading(false);
            } catch (err) {
                setError('Error fetching data');
                setLoading(false);
            }
        }, 500), // 500ms debounce
        []
    );
    const handleSelect = (item) => {
        setSelectedItem(item);
        setUserId(item.id)
        setUsers([]); // Optionally clear search results
    };

    useEffect(() => {
        if (query) {
            debouncedSearch(query);
        } else {
            setUsers([]);
        }

        // Cleanup function
        return debouncedSearch.cancel;
    }, [query, debouncedSearch]);
    const submitBalance = (e) => {
         e.preventDefault();
         axios.post('addbalance',{
            user_id :userId,
            balance : balance

         },{
             headers : {
                        Authorization :'Bearer ' + token?.access_token
                    }
         })
         .then((balanc) => {
          
            fetchBalances();
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
                        Add Balance
                    </button> 
                    {isModalOpen && (
                     <div className="modal  fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                     <div className="modal-content bg-white rounded-lg shadow-lg p-6">
                         <span className="close cursor-pointer" onClick={toggleModal}>&times;</span>

                         <h1 className="text-2xl font-bold mb-4">Search User</h1>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for user..."
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {loading && <p className="mt-2">Loading...</p>}
            {!loading && query.length >= 2 && users.length === 0 && (
    <p className="mt-2 text-gray-500">No user found.</p>
)}
            {error && <p className="mt-2 text-red-500">{error}</p>}
            <ul className="mt-4">
                 {users?.map((user) => (
                    <li key={user.id} onClick={() => handleSelect(user)} className="border-b py-2">
                        <h2 className="text-lg font-semibold">{user.name}</h2>
                        <p className="text-gray-600">{user.email}</p>
                       
                    </li>
                ))} 
            </ul>


                         <h2 className="text-lg font-semibold">Form Title</h2>
                          {selectedItem && (
                <div>
                    <h3>Selected User:</h3>
                    <p>{selectedItem.name}</p>
                    <p>{selectedItem.email}</p>
                </div>
            )}
                         <form method='post' onSubmit={(e) => submitBalance(e)}>
                             {/* Add your form fields here */}
                             <input value={balance} onChange={(e) => setBalance(e.target.value)} type="text" placeholder="Enter Amount" className="border rounded p-2 w-full mb-4" />
                             <button type="submit" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 px-4 py-2">Submit</button> {/* Specific width for submit button */}
                         </form>
                     </div>
                 </div>
                )}
   
    </>
  )
}

export default BalanceModal