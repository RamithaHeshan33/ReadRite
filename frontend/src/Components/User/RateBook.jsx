import React, { useState, useEffect } from 'react';
import UserAfterLogin from '../Navbar/UserAfterLogin';
import CustomeFooter from '../Footer/Footer';
import { useLocation, useNavigate } from 'react-router-dom';

function RateBook() {
    const location = useLocation();
    const book = location.state;
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('UserTocken');

        if (!token) {
            navigate('/user/login');
        }
    }, [navigate]);

    if (!book) {
        return <div>Loading...</div>;
    }

    return (
        <div
            className="App h-screen flex flex-col"
            style={{
                backgroundImage: "url('../../background/ratebook.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <UserAfterLogin />

            <div className="flex h-150 mt-5 ml-20 mr-20 items-center">
                <div className="left text-center">
                    {book.bookImage && (
                        <img
                            src={`http://localhost:5000/${book.bookImage.replace("\\", "/")}`}
                            alt={book.bookName}
                            className="w-350 h-150 border-2 rounded-2xl mt-5"
                        />
                    )}
                    <button onClick={() => navigate(-1)} className="cursor-pointer mt-3">← Back</button>
                </div>
                <div className="ml-20">
                    <h3 className="font-bold text-5xl mb-5">{book.bookName}</h3>
                    <p className="text-gray-700 text-xl">{book.bookDescription}</p>
                    <div className='flex gap-50'>
                        <div>
                            <p className="mt-4 text-lg">Author: </p>
                            <p className='text-2xl font-bold'> {book.authorName} </p>
                        </div>

                        <div>
                            <p className="mt-4 text-lg">Supplier: </p>
                            <p className='text-2xl font-bold'> {book.supplierName} </p>
                        </div>

                        <div>
                            <p className="mt-4 text-lg">Price: </p>
                            <p className='text-2xl font-bold'> ${book.bookPrice} </p>
                        </div>

                        
                    </div>

                    <div className='flex gap-5 mt-15'>
                        <button className="w-40 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer mt-5" onClick={setModelType('rate')}>Rate</button>
                        <button className="w-40 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer mt-5" onClick={setModelType('view')}>View Ratings</button>
                    </div>
                </div>
            </div>

            <div style={{ marginTop: 'auto' }}>
                <CustomeFooter />
            </div>
        </div>
    );
}

export default RateBook;
