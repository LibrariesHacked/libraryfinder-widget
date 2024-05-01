import React from 'react'
import PropTypes from 'prop-types'

import List from '@mui/material/List'

import LibraryListItem from './LibraryListItem'

const LibraryList = props => {
  const { libraries } = props
  return (
    <List sx={{ maxHeight: '100%', overflow: 'auto' }}>
      {libraries.map(library => (
        <LibraryListItem key={library.id} library={library} />
      ))}
    </List>
  )
}

LibraryList.propTypes = {
  libraries: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string
    })
  ).isRequired
}

export default LibraryList
