import { useState, useEffect } from 'react'

import Library from '../models/library'

import { sortObjectsByNearestLocation } from '../utils/geo'

const useLibraries = () => {
  const [loadingLibraries, setLoadingLibraries] = useState(false)
  const [libraries, setLibraries] = useState([])
  const [loadingLibrary, setLoadingLibrary] = useState(false)

  useEffect(() => {
    const fetchAllLibraries = async () => {
      setLoadingLibraries(true)
      const libs = await Library.getAllLibraries()
      setLibraries(libs)
      setLoadingLibraries(false)
    }

    fetchAllLibraries()
  }, [])

  const getLibrary = async libraryId => {
    setLoadingLibrary(true)
    const library = await Library.getLibrary(libraryId)
    const updatedLibraries = libraries.map(lib => {
      if (lib.library_id === libraryId) return library
      return lib
    })
    setLibraries(updatedLibraries)
  }

  const sortLibrariesByLocation = (longitude, latitude) => {
    const sortedLibraries = sortObjectsByNearestLocation(
      libraries,
      longitude,
      latitude
    )
    setLibraries(sortedLibraries)
  }

  return {
    loadingLibraries,
    loadingLibrary,
    libraries,
    getLibrary,
    sortLibrariesByLocation
  }
}

export default useLibraries
