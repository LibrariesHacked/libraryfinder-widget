import { useState, useEffect } from 'react'

import PlaceName from '../models/placeName'

const usePlaceNameSearch = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [localTypes, setLocalTypes] = useState([])
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchResults = async () => {
      const results = await PlaceName.search(searchTerm, localTypes)
      setResults(results)
    }

    if (searchTerm) {
      setLoading(true)
      fetchResults()
      setLoading(false)
    } else {
      setResults([])
    }
  }, [searchTerm, localTypes])

  const runPlaceNameSearch = (text, types) => {
    setSearchTerm(text)
    setLocalTypes(types)
  }

  return {
    loading,
    results,
    runPlaceNameSearch
  }
}

export default usePlaceNameSearch
