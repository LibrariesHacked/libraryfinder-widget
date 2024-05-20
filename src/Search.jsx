import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Autocomplete from '@mui/material/Autocomplete'
import CircularProgress from '@mui/material/CircularProgress'
import TextField from '@mui/material/TextField'

import usePlaceNameSearch from './hooks/usePlaceNameSearch'

const Search = props => {
  const { refreshLibraryList } = props

  const { loading, results, runPlaceNameSearch } = usePlaceNameSearch()

  const [selectedPlaceName, setSelectedPlaceName] = useState(null)
  const [inputValue, setInputValue] = useState('')

  const options = results.map(placeName => ({
    label: placeName.name1,
    longitude: placeName.longitude,
    latitude: placeName.latitude
  }))

  const loadingProgress = <CircularProgress color='inherit' size={20} />

  return (
    <Autocomplete
      id='autocomplete_placename'
      options={options}
      freeSolo
      value={selectedPlaceName}
      inputValue={inputValue}
      noOptionsText='No locations'
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue)
        runPlaceNameSearch(newInputValue)
      }}
      onChange={(event, newValue) => {
        setSelectedPlaceName(newValue)
        refreshLibraryList(newValue.longitude, newValue.latitude)
      }}
      renderInput={params => (
        <TextField
          {...params}
          label='Search for a place name'
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
    />
  )
}

Search.propTypes = {
  refreshLibraryList: PropTypes.func.isRequired
}

export default Search
