import { useState, useEffect } from 'react';
import { AiOutlineLogout } from 'react-icons/ai'
import { useParams, useNavigate } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';
import { gapi } from "gapi-script";

import { userCreatedPinsQuery, userQuery, userSavedPinsQuery } from '../utils/data';
import { client } from "../client";
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner'


const randomImage = `https://source.unsplash.com/1600x900/?nature,photography,technology,food`

const activeButtonStyles = 'bg-gray-300 text-dark-300 font-bold p-2 rounded-full w-20 outline-none'
const notActiveButtonStyles = 'bg-primary mr-4 ext-gray-950 font-bold p-2 rounded-full w-20 outline-none'

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [pins, setPins] = useState(null);
    const [text, setText] = useState('Created')
    const [activeButton, setActiveButton] = useState('created')
    const { userId } = useParams()
    const navigate = useNavigate()


    useEffect(() => {
        const query = userQuery(userId)

        client.fetch(query)
            .then((data) => {
                setUser(data[0])
            })
    }, [userId]);

    useEffect(() => {
        if (text === 'Created') {
            const createdPinsQuery = userCreatedPinsQuery(userId)

            client.fetch(createdPinsQuery)
                .then((data) => {
                    setPins(data)
                })

        } else {
            const savedPinsQuery = userSavedPinsQuery(userId)

            client.fetch(savedPinsQuery)
                .then((data) => {
                    setPins(data)
                })

        }

    }, [text, userId])

    const logOut = () => {
        const authInstance = gapi.auth2.getAuthInstance();
        if (authInstance) {
            authInstance.signOut().then(() => {
                localStorage.clear();
                navigate('/login');
            });
        } else {
            localStorage.clear();
            navigate('/login');
        }
    };

    if (!user) {
        return <Spinner message={'Loading profiles ...'} />
    }
    return (
        <div className='relative  pb-2 h-full justify-center items-center'>
            <div className='flex flex-col pb-5'>
                <div className='relative flex flex-col pb-7'>
                    <div className='flex flex-col justify-center items-center'>
                        <img
                            src={randomImage}
                            alt='banner'
                            className='w-full h-370 2xl:h-510 shadow-lg object-cover'
                        />
                        <img
                            src={user.image}
                            className='rounded-full w-20 h-20 -mt-10 shadow-xl object-cover'
                            alt='user-pic'
                        />
                        <h1 className='font-bold text-3xl text-center mt-3'>
                            {user.userName}
                        </h1>
                        <div className='absolute top-0 right-0 p-2 z-1'>
                            {userId === user._id && (
                                <GoogleLogout
                                    clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
                                    render={(renderProps) => (
                                        <button type='button' className='bg-white p-2 rounded-full flex shadow-md cursor-pointer outline-none'
                                            onClick={renderProps.onClick}
                                            disabled={renderProps.disabled}

                                        >
                                            <AiOutlineLogout title='Logout' color='red' fontSize={21} />
                                        </button>
                                    )}
                                    onLogoutSuccess={logOut}
                                    cookiePolicy='single_host_origin'
                                />
                            )}
                        </div>
                    </div>
                    <div className='text-center mb-7'>
                        <button
                            type='button'
                            onClick={(e) => {
                                setText(e.target.textContent)
                                setActiveButton('created')
                            }}

                            className={`${activeButton === 'created' ? activeButtonStyles : notActiveButtonStyles}`}
                        >
                            Created
                        </button>
                        <button
                            type='button'
                            onClick={(e) => {
                                setText(e.target.textContent)
                                setActiveButton('saved')
                            }}
                            className={`${activeButton === 'saved' ? activeButtonStyles : notActiveButtonStyles}`}
                        >
                            Saved
                        </button>
                    </div>
                    {pins?.length ? (
                        <div className='p-2'>
                            <MasonryLayout pins={pins} />
                        </div>

                    ) : (
                        <div className='flex flex-col gap-3 justify-center items-center  mt-4'
                        >
                            <div className='mt-8 mb-2 flex justify-center items-center font-bold w-full text-2xl'>
                                Inspire with a picture Idea
                            </div>
                            <button
                                type='button'
                                className='bg-blue-500 text-white font-bold p-3 rounded-full outline-none'
                                onClick={() => navigate('/create-pin')}
                            >
                                Create
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div >
    )
}

export default UserProfile