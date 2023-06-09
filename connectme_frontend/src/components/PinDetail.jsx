import { useState, useEffect } from 'react'
import { MdDownloadForOffline, MdDeleteForever } from 'react-icons/md'
import { FcLike } from 'react-icons/fc'
import { AiOutlineEdit } from 'react-icons/ai'
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'

import Spinner from './Spinner';
import MasonryLayout from './MasonryLayout'
import { client, urlFor } from '../client'
import { pinDetailMorePinQuery, pinDetailQuery } from "../utils/data.js"

const PinDetail = ({ user }) => {
  const [pins, setPins] = useState(null)
  const [pinDetail, setPinDetail] = useState(null)
  const [comment, setComment] = useState('')
  const [addingComment, setAddingComment] = useState(false)
  const [likeCount, setLikeCount] = useState(0)

  //hint: whatever you set as a dynamic parameter from path in the route component, which in this case its pinId,that points to pinDetails comp, you can use useParams() to fetch it right here
  const { pinId } = useParams()

  const handleAddComment = () => {
    if (comment) {
      setAddingComment(true)
      const id = uuidv4()
      client
        .patch(pinId)
        .setIfMissing({ comments: [] })
        .insert('after', 'comments[-1]', [{
          comment,
          _key: id,
          postedBy: {
            _type: 'postedBy',
            _ref: user._id
          }
        }])
        .commit()
        .then((res) => {
          const newComment = {
            _key: id,
            comment,
            postedBy: {
              _id: user._id,
              image: user.image,
              userName: user.userName
            }
          }


          setPinDetail(prev => ({
            ...prev,
            comments: prev.comments ? [...prev.comments, newComment] : [newComment]
          }))

          // fetchPinDetails()
          setComment('')
          setAddingComment(false)

        })
    }
  }

  // const deleteComment = (docId) => {
  //   client.delete(docId)
  //     .then(() => {
  //       window.local.reload()
  //     })
  // }

  const fetchPinDetails = () => {
    let query = pinDetailQuery(pinId)

    if (query) {
      client.fetch(query)
        .then((data) => {

          setPinDetail(data[0])
          if (data[0]) {
            const query1 = pinDetailMorePinQuery(data[0])

            client.fetch(query1)
              .then((res) => {

                setPins(res)
              })
          }
        })
    }
  }

  useEffect(() => {
    fetchPinDetails()
  }, [pinId])






  if (!pinDetail) {
    return <Spinner message='Loading pictures... ' />
  }

  return (
    <>

      <div
        className='flex xl:flex-row flex-col m-auto bg-white'
        style={{ maxWidth: '1500px', borderRadius: '32px' }}
      >
        <div className='flex justify-center items-center md:items-start flex-initial'>
          <img
            src={pinDetail?.image && urlFor(pinDetail.image).url()} alt='user-post'
            className='rounded-t-3xl rounded-b-lg'
          />
        </div>
        <div className='w-full p-5 flex-1 xl:min-w-620'>
          <div className='flex items-center justify-between'>
            <div className='flex gap-2 items-center'>
              <a
                href={`${pinDetail.image?.asset?.url}?dl=`}
                download
                onClick={(e) => e.stopPropagation()}
                className='bg-white w-9 h-9 rounded-full flex justify-center items-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none'
              >
                <MdDownloadForOffline />
              </a>
            </div>
            <a
              href={pinDetail.destination}
              target='_blank'
              rel='noreferrer noopener'
            >
              {pinDetail.destination}
            </a>
          </div>
          <div>
            <h1 className='text-4xl font-bold break-word mt-3'>
              {pinDetail.title}
            </h1>
            <p className='mt-3'>{pinDetail.about}</p>
          </div>
          <Link
            to={`user-profile/${pinDetail.postedBy?._id}`}
            className='flex gap-2 mt-2 items-center bg-white rounded-lg'
          >
            <img
              src={pinDetail.postedBy?.image}
              className='h-8 w-8 rounded-full object-cover'
              alt='user-profile'
            />
            <p className='font-semibold capitalize'>{pinDetail.postedBy?.userName}</p>
          </Link>
          {pinDetail?.comments?.length > 1 ? (
            <div className='flex mt-5 gap-2'>
              <p className='text-2xl'>{pinDetail?.comments?.length}</p>
              <h2 className='text-2xl'>Comments</h2>
            </div>
          ) : (
            <div className='flex mt-5 gap-2'>
              <p className='text-2xl'>{pinDetail?.comments?.length}</p>
              <h2 className='text-2xl'>Comment</h2>
            </div>
          )}
          <div className='max-h-370 overflow-y-auto'>
            {pinDetail?.comments?.map((comment) => (
              <div
                key={comment?._key}
                className='flex mt-5 gap-2 items-center bg-white rounded-lg'
              >

                <img
                  src={comment?.postedBy?.image}
                  alt='user-profile'
                  className='h-10 w-10 rounded-full cursor-pointer'
                />
                <div className='flex flex-col'>
                  <p className='font-bold'>{comment?.postedBy?.userName}</p>
                  <p>{comment.comment}</p>
                  {/*FIX: the edit, delete, time and comment feature */}
                  {/* {comment && (
                    <div className='flex gap-5'>
                      <p className='text-gray-500 text-sm'>11m</p>
                      <p className='text-gray-500 text-sm cursor-pointer'>Reply</p>
                      <div
                        className='flex justify-center gap-0.5 items-center cursor-pointer'
                      >
                        <FcLike />
                        <p className='text-gray-500 text-sm'>1</p>
                      </div>
                      <div className='flex justify-center gap-0.5 items-center'>
                        < AiOutlineEdit className='w-4.5 h-4.5 cursor-pointer' />
                      </div>
                      <div
                        className='flex justify-center gap-0.5 items-center'
                      // onClick={deleteComment}
                      >
                        < MdDeleteForever className='w-4.5 h-4.5 cursor-pointer' />
                      </div>
                    </div>
                  )} */}
                </div>
              </div>
            ))}
          </div>
          <div className='flex flex-wrap mt-6 gap-3 '>
            <Link
              to={`user-profile/${pinDetail.postedBy?._id}`}

            >
              <img
                src={pinDetail.postedBy?.image}
                className='h-10 w-10 rounded-full cursor-pointer'
                alt='user-profile'
              />
            </Link>
            <input
              className='flex-1 outline-none border-gray-100 border-2 p-2 rounded-2xl focus:border-gray-300'
              type='text'
              placeholder='add a comment'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              type='button'
              className='bg-blue-500 text-white px-6 rounded-full oy-2 font-semibold text-base outline-none'
              onClick={handleAddComment}
            >
              {addingComment ? 'Posting the comment...' : 'Post'}
            </button>
          </div>
        </div>
      </div>

      {
        pins?.length > 0 ? (
          <>
            <h2 className='text-center font-bold text-2x mt-8 mb-4'>More Like this..</h2>
            <MasonryLayout pins={pins} />
          </>
        ) :
          <Spinner message='Loading more pictures ...' />
      }
    </>

  )
}

export default PinDetail