import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FaHome } from 'react-icons/fa'
import { BsFillPeopleFill } from 'react-icons/bs'
import { categories } from '../utils/data'
import AuroraLogo from '../assets/images/aurora.logo.png'

const Sidebar = ({ user, closeToggle }) => {

    const isNotActiveStyle = 'flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize'
    const isActiveStyle = 'flex items-center px-5 gap-3 font-extrabold border-r-2 border-black transition-all duration-200 ease-in-out capitalize'

    const handleCloseSidebar = () => {
        if (closeToggle) {
            closeToggle(false)
        }
    }
    return (
        <div className='flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar'>
            <div className='flex flex-col'>
                <Link
                    to="/"
                    className='flex px-5 gap-2 my-6 pt-1 w-190 items-center'
                    onClick={handleCloseSidebar}
                >
                    <div className='flex justify-center items-end space-x-1 mb-4'>
                        <div className='flex justify-center align-center'>
                            <div className='flex justify-center items-center'>
                                <img src={AuroraLogo} className='w-8 h-8' alt="logo" />
                            </div>
                        </div>
                        <div className='flex justify-center items-center'>
                            <p className='text-black text-lg font-semi-bold uppercase tracking-[0.25em]'
                            >
                                aurora
                            </p>
                        </div>
                    </div>

                </Link>
                <div className='flex flex-col gap-5'>
                    <NavLink
                        to='/'
                        className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}
                        onClick={handleCloseSidebar}>
                        <FaHome
                        />
                        Home
                    </NavLink>
                    <h3
                        className='mt-2 px-5 text-gray-500 text-base xl:text-xl'
                    >
                        Discover categories
                    </h3>
                    {categories.slice(0, categories.length - 1).map((category) => (
                        <NavLink to={`/category/${category.name}`}
                            className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}
                            onClick={handleCloseSidebar}
                            key={category.name}
                        >
                            <img
                                src={category.image}
                                alt='category'
                                className='w-8 h-8 rounded-full shadow-sm' />
                            {category.name}
                        </NavLink>
                    ))}
                </div>
            </div>
            {user &&
                (
                    <Link
                        to={`user-profile/${user._id}`}
                        className='flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3'
                        onClick={handleCloseSidebar}
                    >
                        <img
                            src={user.image}
                            className='w-10 h-10 rounded-full'
                            alt='user-profile'
                        />
                        <p>{user.userName}</p>
                    </Link>
                )
            }

        </div>
    )
}

export default Sidebar