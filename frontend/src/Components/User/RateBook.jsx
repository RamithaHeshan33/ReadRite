import React, { useState, useEffect } from "react";
import UserAfterLogin from "../Navbar/UserAfterLogin";
import CustomeFooter from "../Footer/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function RateBook() {
    const location = useLocation();
    const book = location.state;
    const navigate = useNavigate();
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    const [modelType, setModelType] = useState(null);
    const [comment, setComment] = useState("");
    const [ratings, setRatings] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("UserTocken");
        if (!token) {
            navigate("/user/login");
        }
    }, [navigate]);

    if (!book) {
        return <div>Loading...</div>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user || !user.id) {
            alert("User is not logged in.");
            return;
        }

        if (!book || !book._id) {
            alert("Invalid book data.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/rate", {
                bookId: book._id,
                userId: user.id,
                comment: comment,
            });

            if (response.status === 201) {
                alert("Rate submitted successfully");
                setComment("");
                setModelType(null);
            }
        } catch (err) {
            console.error("Error submitting rate:", err.response?.data || err.message);
            alert(err.response?.data?.message || "Failed to submit rating.");
        }
    };

    const fetchRatings = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:5000/rate/book/${book._id}`);
            setRatings(response.data); // Store ratings in state
        } catch (err) {
            console.error("Error fetching ratings:", err.response?.data || err.message);
            alert(err.response?.data?.message || "Failed to fetch ratings.");
        } finally {
            setLoading(false);
        }
    };

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
                    <div className="flex gap-50">
                        <div>
                            <p className="mt-4 text-lg">Author:</p>
                            <p className="text-2xl font-bold">{book.authorName}</p>
                        </div>
                        <div>
                            <p className="mt-4 text-lg">Supplier:</p>
                            <p className="text-2xl font-bold">{book.supplierName}</p>
                        </div>
                        <div>
                            <p className="mt-4 text-lg">Price:</p>
                            <p className="text-2xl font-bold">${book.bookPrice}</p>
                        </div>
                    </div>
                    <div className="flex gap-5 mt-15">
                        <button
                            className="w-40 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer mt-5"
                            onClick={() => setModelType("rate")}
                        >
                            Rate Book
                        </button>
                        <button
                            className="w-40 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer mt-5"
                            onClick={() => {
                                setModelType("view");
                                fetchRatings();
                            }}
                        >
                            View Rates
                        </button>
                    </div>
                </div>
            </div>

            <div style={{ marginTop: "auto" }}>
                <CustomeFooter />
            </div>

            {modelType === "rate" && (
                <div className="fixed w-full h-full top-0 left-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-10 rounded-lg w-120 h-auto">
                        <h2 className="text-2xl font-bold">Rate for '{book.bookName}'</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mt-5">
                                <input
                                    type="text"
                                    value={user ? user.name : ""}
                                    placeholder="User Name"
                                    className="w-full p-2 border-2 rounded-lg"
                                    readOnly
                                />
                            </div>
                            <div className="mt-5">
                                <input
                                    type="text"
                                    value={book.bookName}
                                    placeholder="Book Name"
                                    className="w-full p-2 border-2 rounded-lg"
                                    readOnly
                                />
                            </div>
                            <div className="mt-5">
                                <textarea
                                    name="rate"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    className="w-full p-2 border-2 rounded-lg"
                                    placeholder="Enter your rating here"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer mt-5"
                            >
                                Submit
                            </button>
                        </form>
                        <button
                            className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer mt-5"
                            onClick={() => setModelType(null)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {modelType === "view" && (
                <div className="fixed w-full h-full top-0 left-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-10 rounded-lg w-120 h-auto">
                        <h2 className="text-2xl font-bold">Ratings for '{book.bookName}'</h2>
                        {loading ? (
                            <p>Loading ratings...</p>
                        ) : ratings.length > 0 ? (
                            <ul className="mt-5">
                                {ratings.map((rating, index) => (
                                    <li key={index} className="border p-3 rounded-lg mb-2">
                                        <p className="font-bold">{rating.userId?.name || "Unknown User"}</p> {/* Display user name */}
                                        <p>{rating.comment}</p>
                                    </li>
                                ))}

                            </ul>
                        ) : (
                            <p>No ratings yet.</p>
                        )}
                        <button
                            className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer mt-5"
                            onClick={() => setModelType(null)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default RateBook;
