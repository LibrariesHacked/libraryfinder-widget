import React from 'react'
import PropTypes from 'prop-types'

import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'

import LibraryListItem from './LibraryListItem'

const LibraryList = props => {
  const { libraries, firstSearchCompleted } = props
  return (
    <List sx={{ maxHeight: '100%', overflow: 'auto' }}>
      {firstSearchCompleted &&
        libraries
          .slice(0, 10)
          .map(library => (
            <LibraryListItem key={library.id} library={library} />
          ))}
      {!firstSearchCompleted && (
        <ListItem>
          <ListItemText>
            Use the postcode search to select your postcode and see local
            libraries
          </ListItemText>
        </ListItem>
      )}
    </List>
  )
}

LibraryList.propTypes = {
  libraries: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string
    })
  ).isRequired,
  firstSearchCompleted: PropTypes.bool.isRequired
}

export default LibraryList
