import React, { useState } from 'react'

import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import CircularProgress from '@mui/material/CircularProgress'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'

import SearchIcon from '@mui/icons-material/Search'

import usePlaceNameSearch from './hooks/usePlaceNameSearch'

const LOCAL_TYPES = [
  { name: 'City', label: 'City' },
  { name: 'Village', label: 'Village' },
  { name: 'Town', label: 'Town' },
  { name: 'Hamlet', label: 'Hamlet' },
  { name: 'Other Settlement', label: 'Other Settlement' },
  { name: 'Group Of Islands', label: 'Group Of Islands' },
  {
    name: 'Higher or University Education',
    label: 'Higher or University Education'
  },
  { name: 'Hospital', label: 'Hospital' },
  { name: 'Inland Water', label: 'Inland Water' },
  { name: 'Island', label: 'Island' },
  { name: 'Postcode', label: 'Postcode' },
  { name: 'Railway Station', label: 'Railway Station' },
  { name: 'Suburban Area', label: 'Suburban Area' },
  { name: 'Valley', label: 'Valley' },
  { name: 'Woodland Or Forest', label: 'Woodland Or Forest' },
  { name: 'Named Road', label: 'Named Road' }
]

const Search = props => {
  const { refreshLibraryList } = props

  const { loading, results, runPlaceNameSearch } = usePlaceNameSearch()

  const [inputValue, setInputValue] = useState('')
  const [selectedPlaceName, setSelectedPlaceName] = useState(null)

  const loadingProgress = (
    <InputAdornment position='end'>
      <CircularProgress color='inherit' size={18} />
    </InputAdornment>
  )

  return (
    <Autocomplete
      options={results.sort((a, b) => {
        const indexArray = LOCAL_TYPES.map(t => t.label)
        return indexArray.indexOf(a.localType) - indexArray.indexOf(b.localType)
      })}
      renderInput={params => (
        <TextField
          {...params}
          label='Search by place or postcode'
          variant='filled'
          slotProps={{
            input: {
              ...params.InputProps,
              sx: {
                backgroundColor: 'white',
                borderRadius: theme => theme.shape.borderRadius
              },
              startAdornment: (
                <InputAdornment>
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: loading && loadingProgress,
              disableUnderline: true
            }
          }}
        />
      )}
      renderOption={(props, option) => (
        <Box component='li' {...props} key={results.indexOf(option)}>
          {option.name1}
          <Chip
            sx={{ marginLeft: theme => theme.spacing() }}
            color='primary'
            size='small'
            label={
              option.populatedPlace ||
              option.county ||
              option.region ||
              option.country
            }
            variant='filled'
          />
        </Box>
      )}
      filterOptions={x => x}
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
        if (newValue !== null) {
          setSelectedPlaceName(newValue)
          refreshLibraryList(newValue.longitude, newValue.latitude)
        }
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue)
        runPlaceNameSearch(
          newInputValue,
          LOCAL_TYPES.map(t => t.name)
        )
      }}
      value={selectedPlaceName}
    />
  )
}

export default Search
