import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/AdminAfterLogin';
import Footer from '../Footer/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const URL = 'http://localhost:5000/book';

function Search() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
    }
  });

  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(URL);
        console.log('API Response: ', response.data);
        setBooks(response.data.books);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) =>
    book.bookName.toLowerCase().includes(search.toLowerCase()) ||
    book.authorName.toLowerCase().includes(search.toLowerCase()) ||
    book.supplierName.toLowerCase().includes(search.toLowerCase()) ||
    book.bookPrice.toString().includes(search) || // ✅ Fixed: Convert to string before searching
    book.bookDescription.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="App h-screen flex flex-col"
      style={{
        backgroundImage: "url('../background/searchbook.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Navbar />
      <h2 className="text-5xl font-bold text-center mt-8">Search Books</h2>
      <div className="flex items-center justify-center mt-10">
        {/* ✅ Fixed: `onChange` to update search state */}
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search Books"
          className="border-2 border-blue-500 p-2 w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2 cursor-pointer"
        >
          Search
        </button>
      </div>

      <div className="card-container h-100 overflow-y-auto mt-8 scroll-hide">
        <div className="flex flex-wrap justify-center mt-8 gap-5">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <div key={book._id} className="card border-2 border-blue-700 w-75 h-95 rounded-lg">
                <img
                  src={`http://localhost:5000/${book.bookImage.replace(/\\/g, '/')}`} // ✅ Fix: Convert `\` to `/`
                  alt={book.bookName}
                  className="w-full h-70 object-cover"
                  onError={(e) => { e.target.src = "https://via.placeholder.com/150"; }} // ✅ Fallback image
                />

                <h2 className="text-xl font-bold mt-2 pl-2 pr-2 text-center">{book.bookName}</h2>
                <p className='pl-2 pr-2 text-center'>Author: {book.authorName}</p>
                <p className='pl-2 pr-2 text-center'>Price: ${book.bookPrice}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-red-500 mt-4">No books available</p>
          )}
        </div>
      </div>
      

      <div style={{ marginTop: 'auto' }}>
        <Footer />
      </div>
    </div>
  );
}

export default Search;
