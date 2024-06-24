import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { ThemeProvider } from '@mui/material/styles'

import CssBaseline from '@mui/material/CssBaseline'

import Box from '@mui/material/Box'
import Header from './Header'
import Search from './Search'
import LibraryList from './LibraryList'
import LinearProgress from '@mui/material/LinearProgress'
import Footer from './Footer'

import WebFont from 'webfontloader'

import useLibraries from './hooks/useLibraries'

import theme from './theme'

const App = props => {
  const { width, height, primary, secondary, service, region } = props
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

  primary && (theme.palette.primary.main = primary)
  secondary && (theme.palette.secondary.main = secondary)

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Lexend:400,500,600,700']
      }
    })
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          width,
          height,
          padding: theme => theme.spacing(0.5)
        }}
      >
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            padding: theme => theme.spacing(1),
            border: theme => `1px solid ${theme.palette.divider}`,
            borderRadius: theme => theme.shape.borderRadius
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
      </Box>
    </ThemeProvider>
  )
}

App.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  primary: PropTypes.string,
  secondary: PropTypes.string,
  service: PropTypes.string,
  region: PropTypes.string
}

App.defaultProps = {
  width: '100%',
  height: '100%'
}

export default App
