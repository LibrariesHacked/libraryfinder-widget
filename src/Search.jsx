import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import CircularProgress from '@mui/material/CircularProgress'
import TextField from '@mui/material/TextField'

import usePlaceNameSearch from './hooks/usePlaceNameSearch'

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
            label={option.populatedPlace}
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
