import React from 'react'

import { createTheme, ThemeProvider } from '@mui/material/styles'

import CssBaseline from '@mui/material/CssBaseline'
import Stack from '@mui/material/Stack'

import Header from './Header'
import Search from './Search'
import LibraryList from './LibraryList'
import Footer from './Footer'

import '@fontsource/lexend'

import useLibraries from './hooks/useLibraries'

const theme = createTheme({
  typography: { fontFamily: ['Lexend', 'sans-serif'].join(',') }
})

function App () {
  const { loadingLibraries, loadingLibrary, libraries, getLibrary } =
    useLibraries()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Stack spacing={2}>
        <Header />
        <Search />
        <LibraryList libraries={libraries} getLibrary={getLibrary} />
        <Footer />
      </Stack>
    </ThemeProvider>
  )
}

export default App
