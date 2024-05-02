import React from 'react'

import Typography from '@mui/material/Typography'

function Footer () {
  return (
    <Typography variant='body1' component='p'>
      Powered by{' '}
      <a href='https://www.libraryon.org/' target='_blank' rel='noreferrer'>
        LibraryOn
      </a>
    </Typography>
  )
}

export default Footer
