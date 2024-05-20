import { useState, useEffect } from 'react'

import PlaceName from '../models/placeName'

const usePlaceNameSearch = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchResults = async () => {
      const results = await PlaceName.search(searchTerm)
      setResults(results)
    }

    if (searchTerm) {
      setLoading(true)
      fetchResults()
      setLoading(false)
    } else {
      setResults([])
    }
  }, [searchTerm])

  const runPlaceNameSearch = text => {
    setSearchTerm(text)
  }

  return {
    loading,
    results,
    runPlaceNameSearch
  }
}

export default usePlaceNameSearch
