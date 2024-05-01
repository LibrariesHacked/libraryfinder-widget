import React from 'react'
import PropTypes from 'prop-types'

import ListItem from '@mui/material/ListItem'

const LibraryListItem = props => {
  const { library } = props
  return <ListItem>{library.name}</ListItem>
}

LibraryListItem.propTypes = {
  library: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string
  }).isRequired
}

export default LibraryListItem
