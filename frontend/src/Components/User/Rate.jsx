import React, { useEffect, useState } from "react";
import UserAfterLogin from "../Navbar/UserAfterLogin";
import CustomeFooter from "../Footer/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const URL = "http://localhost:5000/";

function Rate() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("UserTocken");
    if (!token) {
      navigate("/user/login");
    }
  }, [navigate]);

  // Fetch books from API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${URL}book`);
        console.log("Fetched books:", response.data);

        // Ensure books is an array before setting state
        setBooks(response.data.books || []);
      } catch (err) {
        console.error("Error fetching books:", err);
      } finally {
        setLoading(false); // Ensure loading is false after request
      }
    };
    fetchBooks();
  }, []);

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
      <UserAfterLogin />

      <div className="card-container h-150 overflow-y-auto mt-8 scroll-hide">
        <h2 className="text-5xl font-bold text-center">Welcome to ReadRite</h2>

        {loading ? (
          <p className="text-center text-lg font-semibold mt-5">Loading books...</p>
        ) : books.length === 0 ? (
          <p className="text-center text-lg font-semibold mt-5">No books available</p>
        ) : (
          <div className="flex flex-wrap justify-center">
            {books.map((book) => (
              <div
                key={book._id}
                className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-4 p-4"
              >
                {/* Fix image path issue */}
                <img
                  className="w-full h-60 object-cover"
                  src={`${URL}${book.bookImage.replace("\\", "/")}`}
                  alt={book.bookName}
                  onError={(e) => (e.target.src = "/default-book.png")} // Fallback image
                />
                <div className="px-4 py-2">
                  <h3 className="font-bold text-xl mb-2">{book.bookName}</h3>
                  <p className="text-gray-700 text-base">{book.bookDescription}</p>
                </div>
                <div className="px-4 py-2">
                  <div className="flex mb-5">
                    <p className="mr-4">Author Name: </p>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                      {book.authorName}
                    </span>
                  </div>
                  
                  <button
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                    onClick={() => navigate(`/user/rate/${book._id}`, { state: book })}
                  >
                    Rate
                  </button>


                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ marginTop: "auto" }}>
        <CustomeFooter />
      </div>
    </div>
  );
}

export default Rate;
