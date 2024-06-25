import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import Box from '@mui/material/Box'
import Header from './Header'
import Search from './Search'
import LibraryList from './LibraryList'
import LinearProgress from '@mui/material/LinearProgress'
import Footer from './Footer'

import WebFont from 'webfontloader'

import useLibraries from './hooks/useLibraries'

import ScopedCssBaseline from '@mui/material/ScopedCssBaseline'

const App = props => {
  const { width, height, service, region } = props
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
        families: ['Lexend:400,500,600,700']
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
            backgroundColor: theme => theme.palette.background.paper
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
          <Box sx={{ flexGrow: 1, minHeight: 0 }}>
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

App.defaultProps = {
  width: '100%',
  height: '100%'
}

export default App
