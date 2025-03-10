import React from 'react'
import UserAfterLogin from '../Navbar/UserAfterLogin'

function Rate() {
  return (
    <div className="App h-screen flex flex-col" style={{
        backgroundImage: "url('../background/searchbook.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
    }}>
        <UserAfterLogin />

    </div>
  )
}

export default Rate