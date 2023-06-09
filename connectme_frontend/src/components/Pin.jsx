import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
//hint uuid ==> a unique identifier that provides unique id for each one of our posts
import { v4 as uuidv4 } from 'uuid'
import { MdDownloadForOffline } from 'react-icons/md'
import { AiTwotoneDelete } from 'react-icons/ai'
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs'

import { client, urlFor } from '../client'
import { fetchUser } from '../utils/fetchUser'


const Pin = ({ pin: { image, destination, postedBy, _id, save } }) => {
  const navigate = useNavigate()
  const [postHovered, setPostHovered] = useState(false);
  const [savingPost, setSavingPost] = useState(false)

  const user = fetchUser()

  //hint: the user googleId is already there of users who saved the post ==> item.postedBy._id
  const alreadySaved = !!(save?.filter((item) => item.postedBy._id === user?.googleId))?.length;

  const savePin = (id) => {
    if (!alreadySaved) {
      setSavingPost(true)
      //update the document in the sanity database
      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert('after', 'save[-1]', [{
          _key: uuidv4(),
          userId: user?.googleId,
          postedBy: {
            _type: 'postedBy',
            _ref: user?.googleId
          }
        }])
        .commit()
        .then(() => {
          window.location.reload()
          setSavingPost(false)
        })

    }
  }

  const deletePin = (id) => {
    client
      .delete(id)
      .then(() => {
        //hint: this removes the post from the view

        window.location.reload()
      })
  }

  return (
    <div className='m-2'>
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-detail/${_id}`)}
        className='relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden
                  transition-all duration-500 ease-in-out'
      >
        <img src={urlFor(image).width(250).url()} className='rounded-lg w-full' alt='user-post' />
        {postHovered && (
          <div
            className='absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50'
            style={{ height: '100%' }}
          >
            <div className='flex justify-between items-center'>
              <div className='flex gap-2'>
                <a
                  href={`${image?.asset?.url}?dl=`}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className='bg-white w-9 h-9 rounded-full flex justify-center items-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none'
                >
                  <MdDownloadForOffline />
                </a>
              </div>
              {alreadySaved ? (
                <button
                  type='button'
                  className='bg-black opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outlined-none'
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                >
                  {save?.length} saved
                </button>
              ) : (
                <button
                  type='button'
                  className='bg-blue-700 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outlined-none'
                  onClick={(e) => {
                    e.stopPropagation()
                    savePin(_id)
                  }}
                >
                  save
                </button>
              )}
            </div>
            <div className='flex justify-between items-center gap-2 w-full'>
              {destination && (
                <a
                  href={destination}
                  target='_blank'
                  rel='noreferrer noopener'
                  className='bg-white flex items-center gap-2 text-black font-bold p-2 pr-4 pl-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md outlined-none'
                >
                  <BsFillArrowUpRightCircleFill />

                  {destination.length > 15 ? `${destination.slice(0, 15)}...` : destination}
                </a>
              )}
              {postedBy?._id === user?.googleId && (
                <button
                  type='button'
                  className='bg-white p-2 opacity-70 hover:opacity-100 text-dark font-bold text-base rounded-full hover:shadow-md outlined-none'
                  onClick={(e) => {
                    e.stopPropagation()
                    deletePin(_id)
                  }}
                >
                  <AiTwotoneDelete />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <Link
        to={`user-profile/${postedBy?._id}`}
        className='flex gap-2 mt-2 items-center'
      >
        <img
          src={postedBy?.image}
          className='h-8 w-8 rounded-full object-cover'
          alt='user-profile'
        />
        <p className='font-semibold capitalize'>{postedBy?.userName}</p>
      </Link>
    </div>
  )
}

export default Pin