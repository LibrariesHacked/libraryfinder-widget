import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import ScopedCssBaseline from '@mui/material/ScopedCssBaseline'

import Footer from './Footer'
import Header from './Header'
import LibraryList from './LibraryList'
import Search from './Search'

import WebFont from 'webfontloader'

import useLibraries from './hooks/useLibraries'

const App = ({ width = '100%', height = '500px', service, region }) => {
  const [firstSearchCompleted, setFirstSearchCompleted] = useState(false)
  const {
    loadingLibraries,
    loadingLibrary,
    libraries,
    getLibrary,
    sortLibrariesByLocation
  } = useLibraries()

  const refreshLibraryList = (longitude, latitude) => {
    if (!firstSearchCompleted) {
      setFirstSearchCompleted(true)
    }
    sortLibrariesByLocation(longitude, latitude)
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Lexend:400']
      }
    })
  }, [])

  return (
    <Box
      sx={{
        width,
        height,
        padding: theme => theme.spacing(0.5),
        boxSizing: 'border-box'
      }}
    >
      <ScopedCssBaseline
        sx={{
          background: 'transparent',
          height: '100%'
        }}
      >
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            padding: theme => theme.spacing(1.5),
            border: theme => `1px solid ${theme.palette.divider}`,
            borderRadius: theme => theme.shape.borderRadius,
            backgroundColor: theme => theme.palette.secondary.main
          }}
        >
          <Box>
            <Header />
          </Box>
          <Box>
            {(loadingLibraries || loadingLibrary) && <LinearProgress />}
          </Box>
          <Box>
            <Search
              refreshLibraryList={refreshLibraryList}
              service={service}
              region={region}
            />
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              minHeight: 0,
              padding: theme => theme.spacing(1),
              marginTop: theme => theme.spacing(1),
              borderRadius: theme => theme.shape.borderRadius,
              backgroundColor: 'white'
            }}
          >
            <LibraryList
              libraries={libraries}
              getLibrary={getLibrary}
              firstSearchCompleted={firstSearchCompleted}
            />
          </Box>
          <Box
            sx={{
              padding: theme => theme.spacing(1)
            }}
          >
            <Footer />
          </Box>
        </Box>
      </ScopedCssBaseline>
    </Box>
  )
}

App.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  service: PropTypes.string,
  region: PropTypes.string
}

export default App
