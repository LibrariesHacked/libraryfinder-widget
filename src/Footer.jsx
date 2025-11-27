import React from 'react'

import Typography from '@mui/material/Typography'

function Footer () {
  return (
    <Typography
      variant='body1'
      component='p'
      sx={{ marginTop: theme => theme.spacing(1), textAlign: 'center' }}
    >
      Powered by{' '}
      <a
        href='https://www.libraryon.org/'
        target='_blank'
        rel='noreferrer'
        style={{ color: '#63117b', textDecoration: 'underline' }}
      >
        LibraryOn
      </a>
    </Typography>
  )
}

export default Footer
