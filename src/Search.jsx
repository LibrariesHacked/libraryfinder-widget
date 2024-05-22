import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import CircularProgress from '@mui/material/CircularProgress'
import TextField from '@mui/material/TextField'

import usePlaceNameSearch from './hooks/usePlaceNameSearch'

const LOCAL_TYPES = [
  { name: 'City', label: 'City' },
  { name: 'Group Of Islands', label: 'Group Of Islands' },
  { name: 'Hamlet', label: 'Hamlet' },
  {
    name: 'Higher or University Education',
    label: 'Higher or University Education'
  },
  { name: 'Hospital', label: 'Hospital' },
  { name: 'Inland Water', label: 'Inland Water' },
  { name: 'Island', label: 'Island' },
  { name: 'Named Road', label: 'Named Road' },
  { name: 'Other Settlement', label: 'Other Settlement' },
  { name: 'Postcode', label: 'Postcode' },
  { name: 'Railway Station', label: 'Railway Station' },
  { name: 'Suburban Area', label: 'Suburban Area' },
  { name: 'Town', label: 'Town' },
  { name: 'Valley', label: 'Valley' },
  { name: 'Village', label: 'Village' },
  { name: 'Woodland Or Forest', label: 'Woodland Or Forest' }
]

const Search = props => {
  const { refreshLibraryList } = props

  const { loading, results, runPlaceNameSearch } = usePlaceNameSearch()

  const [inputValue, setInputValue] = useState('')
  const [selectedPlaceName, setSelectedPlaceName] = useState(null)

  const loadingProgress = <CircularProgress color='inherit' size={20} />

  return (
    <Autocomplete
      options={results.sort((a, b) => a.localType.localeCompare(b.localType))}
      renderInput={params => (
        <TextField
          {...params}
          label='Search by place name or postcode'
          variant='outlined'
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading && loadingProgress}
                {params.InputProps.endAdornment}
              </React.Fragment>
            )
          }}
        />
      )}
      renderOption={(props, option) => (
        <Box component='li' {...props} key={results.indexOf(option)}>
          {option.name1}
          <Chip
            sx={{ marginLeft: theme => theme.spacing() }}
            color='secondary'
            size='small'
            label={
              option.populatedPlace ||
              option.county ||
              option.region ||
              option.country
            }
            variant='outlined'
          />
        </Box>
      )}
      freeSolo
      fullWidth
      getOptionKey={option => results.indexOf(option)}
      getOptionLabel={option => option.name1}
      groupBy={option => option.localType}
      id='autocomplete_placename'
      inputValue={inputValue}
      loading={loading}
      noOptionsText='No locations'
      onChange={(event, newValue) => {
        setSelectedPlaceName(newValue)
        refreshLibraryList(newValue.longitude, newValue.latitude)
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue)
        runPlaceNameSearch(newInputValue)
      }}
      value={selectedPlaceName}
    />
  )
}

Search.propTypes = {
  refreshLibraryList: PropTypes.func.isRequired
}

export default Search
