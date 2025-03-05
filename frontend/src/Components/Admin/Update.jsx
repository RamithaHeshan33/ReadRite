import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/AdminAfterLogin';
import Footer from '../Footer/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const URL = 'http://localhost:5000/book';

function Update() {
  const navigate = useNavigate();
  const [book, setBook] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedBook, setSelectedBook] = useState(null); // Stores the book data when update is clicked
  const [showModal, setShowModal] = useState(false); // Controls modal visibility
  const [newImage, setNewImage] = useState(null); // Stores the new image file

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(URL);
        setBook(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBooks();
  }, []);

  // This function is triggered when the 'Update' button is clicked. It sets the selected book and opens the modal.
  const handleUpdateClick = (book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  // Handles changes in input fields inside the modal
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedBook((prevBook) => ({ ...prevBook, [name]: value }));
  };

  // Handles image file selection
  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  // Saves changes to the selected book by making a PUT request
  const handleSaveChanges = async () => {
    try {
      const formData = new FormData();
      formData.append('bookName', selectedBook.bookName);
      formData.append('authorName', selectedBook.authorName);
      formData.append('bookPrice', selectedBook.bookPrice);
      formData.append('supplierName', selectedBook.supplierName);
      if (newImage) {
        formData.append('bookImage', newImage);
      }
      
      await axios.put(`${URL}/${selectedBook._id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setShowModal(false);
      window.location.reload(); // Refresh to reflect updates
    } catch (error) {
      console.error(error);
    }
  };

  const filteredBooks = book.filter((b) =>
    b.bookName.toLowerCase().includes(search.toLowerCase()) ||
    b.authorName.toLowerCase().includes(search.toLowerCase()) ||
    b.supplierName.toLowerCase().includes(search.toLowerCase()) ||
    b.bookPrice.toString().includes(search) ||
    b.bookDescription.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="App h-screen flex flex-col" style={{ backgroundImage: "url('../background/upddel.png')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
      <Navbar />
      <h2 className='text-5xl font-bold text-center mt-8'>Update Book</h2>
      <div className='flex items-center justify-center mt-10'>
        <input type='text' placeholder='Search Books' className='border-2 border-blue-500 p-2 w-1/2' onChange={(e) => setSearch(e.target.value)} />
      </div>
      <div className='flex flex-wrap justify-center mt-8 gap-5'>
        {filteredBooks.map((b) => (
          <div key={b._id} className="card border-2 border-blue-700 w-75 h-120 rounded-lg">
            <img src={`http://localhost:5000/${b.bookImage}`} alt={b.bookName} className='w-full h-70 object-cover' />
            <h3 className='text-xl font-bold text-center mt-2'>{b.bookName}</h3>
            <p className='text-center mt-2'>Author: {b.authorName}</p>
            <p className='text-center mt-2'>Price: {b.bookPrice}</p>
            <p className='text-center mt-2'>Supplier: {b.supplierName}</p>
            <div className='flex justify-center mt-4'>
              <button onClick={() => handleUpdateClick(b)} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Update</button>
            </div>
          </div>
        ))}
      </div>

      {/* This condition ensures that the modal is only displayed when a book is selected for updating. */}
      {showModal && selectedBook && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-1/2">
            <h2 className='text-2xl font-bold mb-4'>Update Book</h2>
            <input type="text" name="bookName" value={selectedBook.bookName} onChange={handleInputChange} className="border rounded-lg p-2 w-full mb-2" placeholder="Book Name" />
            <input type="text" name="authorName" value={selectedBook.authorName} onChange={handleInputChange} className="border rounded-lg p-2 w-full mb-2" placeholder="Author Name" />
            <input type="number" name="bookPrice" value={selectedBook.bookPrice} onChange={handleInputChange} className="border rounded-lg p-2 w-full mb-2" placeholder="Price" />
            <input type="text" name="supplierName" value={selectedBook.supplierName} onChange={handleInputChange} className="border rounded-lg p-2 w-full mb-2" placeholder="Supplier Name" />
            <input type="file" accept="image/*" onChange={handleImageChange} className="border rounded-lg p-2 w-full mb-2" />
            <div className="flex justify-end mt-4">
              {/* Closes the modal when the 'Cancel' button is clicked, preventing unintended updates. */}
              <button onClick={() => setShowModal(false)} className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2'>Cancel</button>
              <button onClick={handleSaveChanges} className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>Save</button>
            </div>
          </div>
        </div>
      )}
      <div style={{ marginTop: "auto" }}>
        <Footer />
      </div>
    </div>
  );
}

export default Update;
