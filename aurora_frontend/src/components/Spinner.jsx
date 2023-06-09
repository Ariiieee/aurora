import React from 'react'
import { Circles } from 'react-loader-spinner'

const Spinner = ({ message }) => {

  return (
    <div className='flex flex-col justify-center items-center mt-10 h-full w-full'>
      <Circles color="#0699ea" height={50} width={200} className='m-5' />
      <p className='text-lg mt-4 text-black text-center px-2 italic'>
        {message}
      </p>
    </div>
  )
}

export default Spinner