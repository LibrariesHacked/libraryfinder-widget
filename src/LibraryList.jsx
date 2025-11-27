import React from 'react'

import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'

import LibraryListItem from './LibraryListItem'

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
        backgroundColor: 'white'
      }}
    >
      <ListSubheader key='li_subheader'>
        {firstSearchCompleted && 'Nearby libraries'}
      </ListSubheader>
      {firstSearchCompleted && (
        <>
          {filteredLibraries.map(library => (
            <LibraryListItem
              key={`li_library_${library.libraryId}`}
              library={library}
            />
          ))}
        </>
      )}
      {!firstSearchCompleted && (
        <ListItem>
          <ListItemText>
            Search for a location to find local libraries
          </ListItemText>
        </ListItem>
      )}
    </List>
  )
}

export default LibraryList
