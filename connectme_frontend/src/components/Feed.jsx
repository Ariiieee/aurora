import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { client } from '../client';
import MasonryLayout from './MasonryLayout';
import { searchQuery, feedQuery } from '../utils/data';
import Spinner from './Spinner'

const Feeds = () => {
  const [loading, setLoading] = useState(false)
  const [pins, setPins] = useState(null)

  const { categoryId } = useParams()
  useEffect(() => {
    setLoading(true)

    if (categoryId) {
      const query = searchQuery(categoryId);
      client.fetch(query)
        .then((data) => {
          setPins(data)
          setLoading(false)
        })

    } else {
      client.fetch(feedQuery)
        .then((data) => {
          setPins(data)
          setLoading(false)
        })
    }
  }, [categoryId])

  if (loading) {
    return <Spinner message="We are adding new gaming ideas to your feed!" />
  }

  if (!pins?.length) {
    return <h2 className='flex mt-20 justify-center items-center font-bold text-xl'>No pictures available....</h2>
  }


  return (
    <div>
      {pins && <MasonryLayout pins={pins} />}
    </div>
  )
}

export default Feeds;