import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/AdminAfterLogin';
import Footer from '../Footer/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const URL = 'http://localhost:5000/book';

function Delete() {
  const navigate = useNavigate();

  // Redirect to login if admin token is not found
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedBook, setSelectedBook] = useState(null); // Stores selected book for deletion
  const [showModal, setShowModal] = useState(false); // Controls modal visibility

  // Fetch books from API on component mount
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(URL);
        console.log('API Response: ', response.data);
        setBooks(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBooks();
  }, []);

  // Filter books based on search query
  const filteredBooks = books.filter((book) =>
    book.bookName.toLowerCase().includes(search.toLowerCase()) ||
    book.authorName.toLowerCase().includes(search.toLowerCase()) ||
    book.supplierName.toLowerCase().includes(search.toLowerCase()) ||
    book.bookPrice.toString().includes(search)
  );

  // Handle delete button click to open modal
  const handleDeleteClick = (book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  // Function to delete book from database
  const handleConfirmDelete = async () => {
    if (selectedBook) {
      try {
        await axios.delete(`${URL}/${selectedBook._id}`);
        setBooks(books.filter((book) => book._id !== selectedBook._id)); // Update state after deletion
        setShowModal(false); // Close modal
      } catch (error) {
        console.error('Error deleting book:', error);
      }
    }
  };

  return (
    <div className="App h-screen flex flex-col"
      style={{
        backgroundImage: "url('../background/upddel.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}>
      
      <Navbar />

      <h2 className='text-5xl font-bold text-center mt-8'>Delete Book</h2>
      
      {/* Search Bar */}
      <div className='flex items-center justify-center mt-10'>
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Enter Book Name"
          className='border-2 border-blue-500 p-2 w-1/2'
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Display Books */}
      <div className='flex flex-wrap justify-center mt-8 gap-5'>
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div key={book._id} className="card border-2 border-blue-700 w-75 h-110 rounded-lg">
              <img
                src={`http://localhost:5000/${book.bookImage.replace(/\\/g, '/')}`} // Convert `\` to `/`
                alt={book.bookName}
                className="w-full h-70 object-cover"
                onError={(e) => { e.target.src = "https://via.placeholder.com/150"; }} // Fallback image
              />

              <h2 className="text-xl font-bold mt-2 pl-2 pr-2 text-center">{book.bookName}</h2>
              <p className='pl-2 pr-2 text-center'>Author: {book.authorName}</p>
              <p className='pl-2 pr-2 text-center'>Price: ${book.bookPrice}</p>

              <div className='flex justify-center mt-4'>
                <button onClick={() => handleDeleteClick(book)} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-red-500 mt-4">No books available</p>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <p className="text-lg font-semibold">Are you sure you want to delete this book?</p>
            <div className="flex justify-center mt-4">
              <button onClick={handleConfirmDelete} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2'>Yes</button>
              <button onClick={() => setShowModal(false)} className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'>No</button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div style={{ marginTop: "auto" }}>
        <Footer />
      </div>
    </div>
  );
}

export default Delete;
