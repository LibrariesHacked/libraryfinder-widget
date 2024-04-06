import React from 'react'

import { createTheme, ThemeProvider } from '@mui/material/styles'

import CssBaseline from '@mui/material/CssBaseline'
import Stack from '@mui/material/Stack'

import Header from './Header'
import Search from './Search'
import LibraryList from './LibraryList'
import Footer from './Footer'

const theme = createTheme({
  typography: { fontFamily: ['"Lexend Exa"', 'sans-serif'].join(',') }
})

function App () {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Stack spacing={2}>
        <Header />
        <Search />
        <LibraryList />
        <Footer />
      </Stack>
    </ThemeProvider>
  )
}

export default App
