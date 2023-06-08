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
import { fetchUser } from '../utils/fetchUser'
import AuroraLogo from '../assets/images/aurora.logo.png'


const Home = () => {
    const [toggleSidebar, setToggleSidebar] = useState(false);
    const [user, setUser] = useState(null)
    const scrollRef = useRef(null)

    const userInfo = fetchUser()
    useEffect(() => {
        const query = userQuery(userInfo?.googleId)
        client.fetch(query)
            .then((data) => {
                setUser(data[0])
            })
    }, [])


    //HINT: at the start we need to set our scroll to the top of the page
    useEffect(() => {
        scrollRef.current.scrollTo(0, 0)
    }, [])


    return (
        <div className='flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out'>
            <div className='hidden md:flex h-screen flex-initial'
            >
                <Sidebar user={user && user} />
            </div>
            <div className='flex md:hidden flex-row items-center'>
                <div className='w-full flex flex-row p-2 justify-between items-center shadow-md'>
                    <HiOutlineMenu fontSize={35} className='cursor-pointer' onClick={() => setToggleSidebar(true)} />
                    <Link to='/'>
                        <div className='flex justify-center items-end space-x-1 '>

                            <div className='flex justify-center items-center'>
                                <img src={AuroraLogo} className='w-8 h-8' alt="logo" />
                            </div>
                            <div className='flex justify-center items-center'>
                                <p className='text-black text-lg uppercase tracking-[0.25em]'>
                                    aurora
                                </p>
                            </div>
                        </div>

                    </Link>
                    <Link to={`user-profile/${user?._id}`}>
                        <div className='flex justify-center items-end space-x-1 mt-2'>
                            <div className='flex justify-center align-center '>
                                <img src={user?.image} alt='user profile img' className='w-12 rounded-full' />
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
            {toggleSidebar && (
                <div className='fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in'>
                    <div className='absolute w-full flex justify-end items-center p-2'>
                        <AiFillCloseCircle fontSize={30} className='cursor-pointer' onClick={() => setToggleSidebar(false)} />
                    </div>
                    <Sidebar user={user && user} closeToggle={setToggleSidebar} />
                </div>
            )}

            <div className='pb-2 flex-1 h-screen overflow-y-scroll' ref={scrollRef}>
                <Routes>
                    <Route path='/user-profile/:userId' element={<UserProfile />} />
                    <Route path='/*' element={<Pins user={user && user} />} />
                </Routes>
            </div>
        </div>
    )
}

export default Home

//link to tuts: https://www.youtube.com/watch?v=XxXyfkrP298&t=4887s&ab_channel=JavaScriptMastery

//features:
//[]