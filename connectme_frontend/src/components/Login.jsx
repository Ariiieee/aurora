import React from 'react'
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { FcGoogle } from 'react-icons/fc'
import { BsFillPeopleFill } from 'react-icons/bs'
import ConnectMe from '../assets/videos/connectme.mp4'
import { useEffect } from 'react';
import { gapi } from "gapi-script";
import { client } from "../client"

const Login = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const clientId = process.env.REACT_APP_GOOGLE_API_TOKEN
        function start() {
            gapi.load("auth2", () => {
                gapi.auth2.init({
                    client_id: clientId,
                });
            });
        }
        start();
    }, []);



    const responseGoogle = (response) => {
        //setting profile obj to local storage
        console.log(response.profileObj.name)
        localStorage.setItem('user', JSON.stringify(response.profileObj))
        const { name, googleId, imageUrl } = response.profileObj

        //create a new sanity document for the user, and the user is going to be saved to database
        const doc = {
            _id: googleId,
            _type: 'user',
            userName: name,
            image: imageUrl
        }
        client.createIfNotExists(doc)
            .then(() => {
                navigate('/', { replace: true })
            })
    }

    return (
        <div className='flex justify-start items-center flex-col h-screen'>
            <div className='relative w-full h-full'>
                <video
                    src={ConnectMe}
                    type='video/mp4'
                    controls={false}
                    autoPlay
                    loop
                    muted
                    className='w-full h-full object-cover'

                />
            </div>
            <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay' >
                <div className='flex justify-center items-end space-x-1 mb-4' >
                    <div className='flex justify-center align-center'>
                        <BsFillPeopleFill className='w-8 h-8 text-white' />
                    </div>
                    <div className='flex justify-center items-center'>
                        <p className='text-white text-lg'>ConnectMe</p>
                    </div>

                </div>
                <div className='shadow-2xl'>
                    <GoogleLogin
                        clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
                        render={(renderProps) => (
                            <button type='button' className='bg-mainColor p-2 rounded-lg flex justify-center items-center cursor-pointer outline-none'
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}

                            >
                                <FcGoogle className='mr-4 text-sm' /> Sign in with Google
                            </button>
                        )}
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy='single_host_origin'
                    />
                </div>
            </div>
        </div>
    )
}

export default Login