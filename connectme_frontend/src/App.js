import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import Login from './components/Login';
import Home from './container/Home';
const App = () => {

  const successStyle = {
    background: 'green',
    color: 'white',
  };

  const errorStyle = {
    background: 'red',
    color: 'white',
  };

  const handleConnectionStatus = () => {
    const isConnectedToInternet = navigator.onLine;
    const connectionMessage = isConnectedToInternet ?
      'You are connected to the Internet' : 'No internet Connection';

    const toastOptions = {
      autoClose: 4000,
      hideProgressBar: true,
      pauseOnFocusLoss: true,
      draggable: false,
      pauseOnHover: false,
    };

    if (isConnectedToInternet) {
      toast.success(connectionMessage, { ...toastOptions, style: successStyle });
    } else {
      toast.error(connectionMessage, { ...toastOptions, style: errorStyle });
    }
  }
  useEffect(() => {
    window.addEventListener('online', handleConnectionStatus);
    window.addEventListener('offline', handleConnectionStatus);

    return () => {
      window.removeEventListener('online', handleConnectionStatus);
      window.removeEventListener('offline', handleConnectionStatus);
    }
  })

  return (
    <>
      <Routes>
        <Route path='login' element={<Login />} />
        <Route path='/*' element={<Home />} />
      </Routes>
      <ToastContainer
        position='bottom-center'
        autoClose={4000}
        hideProgressBar={true}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover={false}
        style={{ width: '300px', fontSize: '14px', padding: '0px' }}
      />
    </>
  )
}

export default App
