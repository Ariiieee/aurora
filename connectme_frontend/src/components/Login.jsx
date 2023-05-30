import React from 'react'
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { FcGoogle } from 'react-icons/fc'
import { BsFillPeopleFill } from 'react-icons/bs'
import ConnectMe from '../assets/videos/connectMe (2).mp4'
import { useEffect } from 'react';
import { gapi } from "gapi-script";

const Login = () => {
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
        console.log(response)
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
                <div className='flex justify-center items-end space-x-1 mb-3' >
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