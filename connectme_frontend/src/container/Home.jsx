import { useState, useEffect, useRef } from 'react'
import { HiOutlineMenu } from 'react-icons/hi'
import { AiFillCloseCircle } from 'react-icons/ai'
import { BsFillPeopleFill } from 'react-icons/bs'
import { Link, Route, Routes } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import UserProfile from '../components/UserProfile'
import Pins from './Pins'
import { client } from '../client'
import { userQuery } from '../utils/data'


const Home = () => {
    const [toggleSidebar, setToggleSidebar] = useState(false);
    const [user, setUser] = useState(null)

    const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear()

    useEffect(() => {
        const query = userQuery(userInfo?.googleId)
        client.fetch(query)
            .then((data) => {
                setUser(data[0])
            })
    }, [])


    return (
        <div className='flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out'>
            <div className='hidden md:flex h-screen flex-initial'
            >
                <Sidebar user={user && user} closeToggle={setToggleSidebar} />
            </div>
            <div className='flex md:hidden flex-row items-center'>
                <HiOutlineMenu fontSize={40} className='cursor-pointer' onClick={() => setToggleSidebar(true)} />
                <Link to='/'>
                    <div className='flex justify-center items-end space-x-1 mt-2'>
                        <div className='flex justify-center align-center'>
                            <BsFillPeopleFill className='w-6 h-6 text-blue-600' />
                        </div>
                        <div className='flex justify-center items-center'>
                            <p className='text-black text-md font-semibold'>ConnectMe</p>
                        </div>
                    </div>
                </Link>
                <Link to={`user-profile/${user?._id}`}>
                    <div className='flex justify-center items-end space-x-1 mt-2'>
                        <div className='flex justify-center align-center'>
                            <img src={user?.image} alt='user profile img' className='w-12 ' />
                        </div>
                    </div>
                </Link>
            </div>
            {toggleSidebar && (
                <div className='fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in'>
                    <div className='absolute w-full flex justify-end items-center p-2'>
                        <AiFillCloseCircle fontSize={30} className='cursor-pointer' onClick={() => setToggleSidebar(false)} />
                    </div>
                    <Sidebar user={user && user} closeToggle={setToggleSidebar} />
                </div>
            )}
        </div>
    )
}

export default Home