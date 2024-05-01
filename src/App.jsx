import React, { useState } from 'react'

import { createTheme, ThemeProvider } from '@mui/material/styles'

import CssBaseline from '@mui/material/CssBaseline'

import Box from '@mui/material/Box'
import Header from './Header'
import Search from './Search'
import LibraryList from './LibraryList'
import LinearProgress from '@mui/material/LinearProgress'
import Footer from './Footer'

import '@fontsource/lexend'

import useLibraries from './hooks/useLibraries'

const theme = createTheme({
  typography: { fontFamily: ['Lexend', 'sans-serif'].join(',') }
})

function App () {
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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          height: '600px',
          width: '400px'
        }}
      >
        <Box>
          <Header />
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
        <Box>
          <Footer />
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default App
