import { createTheme } from '@mui/material/styles'

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

export default theme
