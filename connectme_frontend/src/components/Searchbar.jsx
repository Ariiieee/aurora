import { useState, useEffect } from 'react'
import MasonryLayout from './MasonryLayout'
import { client } from '../client'
import { feedQuery, searchQuery } from '../utils/data'
import Spinner from './Spinner'


const Searchbar = ({ searchTerm }) => {
  const [pins, setPins] = useState(null)
  const [loading, setLoading] = useState(false)


  useEffect(() => {

    if (searchTerm) {

      setLoading(true)
      const query = searchQuery(searchTerm.toLowerCase().trim())


      client.fetch(query)
        .then((data) => {
          setPins(data)
          setLoading(false)


        })
    } else {
      //show pins(pictures ) of all categories and search terms
      client.fetch(feedQuery)
        .then((data) => {
          setPins(data)
          setLoading(false)
        })
    }
  }, [searchTerm])

  return (

    <div>
      {loading && <Spinner message='Searching for Pictures ...' />}
      {pins?.length !== 0 && <MasonryLayout pins={pins} />}
      {pins?.length === 0 && searchTerm !== '' && !loading && (
        <div
          className='mt-10 text-center text-xl'
        >
          No Pictures Found!!!
        </div>
      )}
    </div>
  )
}

export default Searchbar