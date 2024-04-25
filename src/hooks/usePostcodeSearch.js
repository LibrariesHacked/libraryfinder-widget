import { useState, useEffect } from 'react'

import Postcode from '../models/postcode'

const usePostcodeSearch = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchResults = async () => {
      const results = await Postcode.search(searchTerm)
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

  const runSearch = text => {
    setSearchTerm(text)
  }

  return {
    loading,
    results,
    runSearch
  }
}

export default usePostcodeSearch
