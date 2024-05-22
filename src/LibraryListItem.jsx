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
        <ListItemText primary={library.name} secondary={library.distance} />
      </ListItem>
      <Divider />
    </>
  )
}

LibraryListItem.propTypes = {
  library: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    distance: PropTypes.number
  }).isRequired
}

export default LibraryListItem
