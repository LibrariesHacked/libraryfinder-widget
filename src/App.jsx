import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { createTheme, ThemeProvider } from '@mui/material/styles'

import CssBaseline from '@mui/material/CssBaseline'

import Box from '@mui/material/Box'
import Header from './Header'
import Search from './Search'
import LibraryList from './LibraryList'
import LinearProgress from '@mui/material/LinearProgress'
import Footer from './Footer'

import WebFont from 'webfontloader'

import useLibraries from './hooks/useLibraries'

const theme = createTheme({
  typography: { fontFamily: ['Lexend', 'sans-serif'].join(',') },
  palette: {
    primary: {
      main: '#3f51b5'
    },
    secondary: {
      main: '#f50057'
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none'
        }
      }
    }
  }
})

const App = props => {
  const { width, height } = props
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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          width,
          height,
          padding: theme => theme.spacing(1)
        }}
      >
        <Box
          sx={{
            height: 'calc(100% - 8px)',
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
            <Search refreshLibraryList={refreshLibraryList} />
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
  height: PropTypes.string
}

App.defaultProps = {
  width: '100%',
  height: '100%'
}

export default App
