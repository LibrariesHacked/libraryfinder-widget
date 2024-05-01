import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Autocomplete from '@mui/material/Autocomplete'
import CircularProgress from '@mui/material/CircularProgress'
import TextField from '@mui/material/TextField'

import usePostcodeSearch from './hooks/usePostcodeSearch'

const Search = props => {
  const { refreshLibraryList } = props

  const { loading, results, runPostcodeSearch } = usePostcodeSearch()

  const [selectedPostcode, setSelectedPostcode] = useState(null)
  const [inputValue, setInputValue] = useState('')

  const options = results.map(postcode => ({
    label: postcode.postcode,
    longitude: postcode.longitude,
    latitude: postcode.latitude
  }))

  const loadingProgress = <CircularProgress color='inherit' size={20} />

  return (
    <Autocomplete
      id='autocomplete_postcode'
      options={options}
      freeSolo
      value={selectedPostcode}
      inputValue={inputValue}
      noOptionsText='No locations'
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue)
        runPostcodeSearch(newInputValue)
      }}
      onChange={(event, newValue) => {
        setSelectedPostcode(newValue)
        refreshLibraryList(newValue.longitude, newValue.latitude)
      }}
      renderInput={params => (
        <TextField
          {...params}
          label='Search for a postcode'
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
