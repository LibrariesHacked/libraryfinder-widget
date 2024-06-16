import React from 'react'
import PropTypes from 'prop-types'

import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import LibraryListItem from './LibraryListItem'
import ListSubheader from '@mui/material/ListSubheader'

const LibraryList = props => {
  const { libraries, firstSearchCompleted } = props

  const filteredLibraries = libraries
    .filter(l => l.distance < 16093)
    .slice(0, 10)
  return (
    <List
      sx={{
        maxHeight: '100%',
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        '& ul': { padding: 0 }
      }}
    >
      {firstSearchCompleted && (
        <>
          <ListSubheader>{`Found ${filteredLibraries.length} nearby libraries`}</ListSubheader>
          {filteredLibraries.map(library => (
            <LibraryListItem key={library.id} library={library} />
          ))}
        </>
      )}
      {!firstSearchCompleted && (
        <ListItem>
          <ListItemText>
            Use the location search to select your nearest location and see
            local libraries
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
