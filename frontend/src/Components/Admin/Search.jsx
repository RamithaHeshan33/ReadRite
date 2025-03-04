import React from 'react'
import Navbar from '../Navbar/AdminAfterLogin'
import Footer from '../Footer/Footer'

function Search() {
  return (
    <div className="App h-screen flex flex-col"
        style={{
        backgroundImage: "url('../background/searchbook.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        }}
    >
        <Navbar />
        <h2 className='text-5xl font-bold text-center mt-8'>Search Books</h2>
        <div className='flex items-center justify-center mt-10'>
            <input type="text" name="search" id="search" placeholder="Search Books" className='border-2 border-blue-500 p-2 w-1/2' />
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2 cursor-pointer'>Search</button>
        </div>
        

        <div style={{ marginTop: "auto" }}>
            <Footer />
        </div>
    </div>
  )
}

export default Search