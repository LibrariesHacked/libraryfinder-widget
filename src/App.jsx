import React from 'react'

import { createTheme, ThemeProvider } from '@mui/material/styles'

import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'

const theme = createTheme({
  typography: { fontFamily: ['"Lexend Exa"', 'sans-serif'].join(',') }
})

function App () {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Typography>Hello</Typography>
    </ThemeProvider>
  )
}

export default App
