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
    .filter(l => l.distance < 11265.4)
    .slice(0, 10)
  return (
    <List
      sx={{
        maxHeight: '100%',
        position: 'relative',
        overflow: 'auto',
        padding: 0,
        marginTop: theme => theme.spacing(1)
      }}
    >
      <ListSubheader>
        {firstSearchCompleted &&
          `Found ${filteredLibraries.length} nearby libraries`}
      </ListSubheader>
      {firstSearchCompleted && (
        <>
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
