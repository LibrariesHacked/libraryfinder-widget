import { useState, useEffect, useRef } from 'react'

import PlaceName from '../models/placeName'

const usePlaceNameSearch = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [localTypes, setLocalTypes] = useState([])
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  const previousController = useRef()

  useEffect(() => {
    const fetchResults = async () => {
      if (previousController.current) previousController.current.abort()
      const controller = new AbortController()
      const signal = controller.signal
      previousController.current = controller
      const results = await PlaceName.search(searchTerm, localTypes, signal)
      setResults(results)
      setLoading(false)
    }

    if (searchTerm) {
      setLoading(true)
      fetchResults()
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
