import React from 'react'
import Navbar from '../Navbar/AdminAfterLogin'
import Footer from '../Footer/Footer'
import './Add.css'

function Add() {
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
                    <form action="">
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input type="text" name="title" id="title" className="form-control" placeholder='Enter the title of the book' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="author">Author</label>
                            <input type="text" name="author" id="author" className="form-control" placeholder='Enter the author of the book' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="genre">Supplier</label>
                            <input type="text" name="supplier" id="supplier" className="form-control" placeholder='Enter the supplier of the book' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea name="description" id="description" className="form-control" placeholder='Enter the description of the book'></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="image">Image</label>
                            <input type="file" name="image" id="image" className="form-control" />
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