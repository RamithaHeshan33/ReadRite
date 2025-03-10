import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import Home from './Components/Home/Home'
import Adminlogin from './Components/Login/AdminLogin'
import AdminRegister from './Components/Register/AdminRegister'
import Userlogin from './Components/Login/UserLogin'
import UserRegister from './Components/Register/UserRegister'

import AdminHome from './Components/Admin/Home'
import AdminAdd from './Components/Admin/Add'
import AdminSearch from './Components/Admin/Search'
import AdminUpdate from './Components/Admin/Update'
import AdminDelete from './Components/Admin/Delete'
import Logout from './Components/Admin/Logout'

import UserHome from './Components/User/Home'
import UserRate from './Components/User/Rate'
import UserLogout from './Components/User/Logout'

function App() {
    const location = useLocation(); // Track the current page

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/admin/login" element={<Adminlogin />} />
                <Route path="/admin/register" element={<AdminRegister />} />

                <Route path="/user/login" element={<Userlogin />} />
                <Route path="/user/register" element={<UserRegister />} />

                <Route path="/admin/logout" element={<Logout />} />
                <Route path="/admin/home" element={<AdminHome />} />
                <Route path="/admin/add" element={<AdminAdd />} />
                <Route path="/admin/update" element={<AdminUpdate />} />
                <Route path="/admin/delete" element={<AdminDelete />} />
                <Route path="/admin/search" element={<AdminSearch />} />

                <Route path="/user/logout" element={<UserLogout />} />
                <Route path="/user/home" element={<UserHome />} />
                <Route path="/user/rate" element={<UserRate />} />
            </Routes>
        </AnimatePresence>
    )
}

export default App
