import React, {useEffect, useState} from 'react'
import Navbar from '../Navbar/AdminAfterLogin'
import Footer from '../Footer/Footer'
import './Add.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const URL = 'http://localhost:5000/book'

function Add() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/admin/login');
        }
    })

    const [book, setBook] = useState({
        bookName: '',
        authorName: '',
        supplierName: '',
        bookPrice: '',
        bookImage: null,
        bookDescription: ''

    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setBook({
            ...book,
            [name]: value
        });
    }

    const handleImage = (e) => {
        setBook((prevBook) => ({
            ...prevBook,
            bookImage: e.target.files[0]
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(book);
        await sendRequest();
        window.location.reload();
    }

    const sendRequest = async () => {
        try {
            const formData = new FormData();
            formData.append('bookName', book.bookName);
            formData.append('authorName', book.authorName);
            formData.append('supplierName', book.supplierName);
            formData.append('bookPrice', book.bookPrice);
            formData.append('bookImage', book.bookImage);
            formData.append('bookDescription', book.bookDescription);
    
            console.log(...formData.entries()); // Debugging output
    
            const response = await axios.post(URL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            console.log(response.data);
            alert('Book added successfully');
        } catch (err) {
            console.error('Error response:', err.response?.data);
            alert('Failed to add book');
        }
    };
    
    

  return (
    <div className="App h-screen flex flex-col"
        style={{
        backgroundImage: "url('../background/addbook.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        }}
    >
        <Navbar />

        <div className="flex h-150 mt-5 ml-20 mr-20 items-center">
            <div className="left">
                <img src="../imgs/add.png" alt="" />
            </div>

            <div className="right-side">
                <div className="form border-2 border-black p-5 rounded-lg">
                    <h2 className="text-5xl font-bold text-center">Add Book</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input type="text" name="bookName" id="title" className="form-control" placeholder='Enter the title of the book' value={book.bookName} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="author">Author</label>
                            <input type="text" name="authorName" id="author" className="form-control" placeholder='Enter the author of the book' value={book.authorName} onChange={handleChange} required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="genre">Supplier</label>
                            <input type="text" name="supplierName" id="supplier" className="form-control" placeholder='Enter the supplier of the book' value={book.supplierName} onChange={handleChange} required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="genre">Price</label>
                            <input type="number" name="bookPrice" id="price" className="form-control" placeholder='Enter the price of the book' value={book.bookPrice} onChange={handleChange} required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea name="bookDescription" id="description" className="form-control" placeholder='Enter the description of the book' value={book.bookDescription} onChange={handleChange} required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="image">Image</label>
                            <input type="file" name="bookImage" id="image" className="form-control" onChange={handleImage} required/>
                        </div>
                        <div className="form-group">
                            <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5 cursor-pointer">Add Book</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div style={{ marginTop: "auto" }}>
            <Footer />
        </div>

    </div>
  )
}

export default Add