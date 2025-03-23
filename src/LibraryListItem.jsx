import React from 'react'

import ListItemButton from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'

import RouteIcon from '@mui/icons-material/RouteRounded'

import { metresToMiles } from './utils/geo'

const LibraryListItem = props => {
  const { library } = props
  return (
    <>
      <ListItem disablePadding>
        <ListItemButton
          component='a'
          href={`https://libraryon.org/libraries/${library.serviceSlug}/${library.slug}`}
          sx={{ width: '100%' }}
          target='_blank'
        >
          <ListItemText
            primary={library.name}
            secondary={
              <>
                {`${metresToMiles(library.distance, 1)} miles`}
                <RouteIcon
                  fontSize='small'
                  sx={{
                    marginLeft: theme => theme.spacing(),
                    verticalAlign: 'top'
                  }}
                />
              </>
            }
          />
        </ListItemButton>
      </ListItem>
      <Divider />
    </>
  )
}

export default LibraryListItem
