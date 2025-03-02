import './App.css'
import {Routes, Route} from 'react-router-dom'
import Home from './Components/Home/Home'
import Adminlogin from './Components/Login/AdminLogin'
import AdminRegister from './Components/Register/AdminRegister'
import Userlogin from './Components/Login/UserLogin'
import UserRegister from './Components/Register/UserRegister'

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<Adminlogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />

        <Route path="/user/login" element={<Userlogin />} />
        <Route path="/user/register" element={<UserRegister />} />

      </Routes>
    </div>
  )
}

export default App
