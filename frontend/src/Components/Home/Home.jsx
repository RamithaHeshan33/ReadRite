import React from 'react'
import './Home.css'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'

function Home() {
  return (
    <div className="App h-screen flex flex-col"
      style={{
        backgroundImage: "url('./background/home.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Navbar />

      <div className="flex h-150 mt-5 ml-20 mr-20 items-center">
        <div className='left'>
          <h2 className='text-5xl font-bold text-center'>Discover, Review, and Share Your Favorite Books</h2>

          <p className='text-3xl mt-5 ml-10 mr-5'>ReadRite is a platform where you can discover new books, review them, and share your thoughts with the world. You can also see what other people are reading and what they think about the books they have read.</p>
        
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5 ml-10 mr-5 cursor-pointer' onClick={() => window.location.href = '/admin/add'}>Get Started</button>
        </div>

        <div className='right'>
          <img src="imgs/home.png" alt="" />
        </div>
      </div>

      <div style={{ marginTop: "auto" }}>
          <Footer />
      </div>
    </div>
  )
}

export default Home