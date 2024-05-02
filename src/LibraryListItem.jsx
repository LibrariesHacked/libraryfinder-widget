import React from 'react'
import PropTypes from 'prop-types'

import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'

import AutoAwesomeIcon from '@mui/icons-material/AutoAwesomeRounded'

const LibraryListItem = props => {
  const { library } = props
  return (
    <>
      <ListItem
        secondaryAction={<Button endIcon={<AutoAwesomeIcon />}>Explore</Button>}
      >
        <ListItemText>{library.name}</ListItemText>
      </ListItem>
      <Divider />
    </>
  )
}

LibraryListItem.propTypes = {
  library: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string
  }).isRequired
}

export default LibraryListItem
