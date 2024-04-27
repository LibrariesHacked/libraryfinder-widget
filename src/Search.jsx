import React, { useState } from 'react'

import Autocomplete from '@mui/material/Autocomplete'
import CircularProgress from '@mui/material/CircularProgress'
import TextField from '@mui/material/TextField'

import usePostcodeSearch from './hooks/usePostcodeSearch'

function Search () {
  const { loading, results, runSearch } = usePostcodeSearch()

  const [selectedPostcode, setSelectedPostcode] = useState(null)

  const options = results.map(postcode => ({
    label: postcode.postcode
  }))

  return (
    <Autocomplete
      id='autocomplete_postcode'
      options={options}
      autoComplete
      value={selectedPostcode}
      noOptionsText='No locations'
      onInputChange={(event, newInputValue) => {
        runSearch(newInputValue)
      }}
      onChange={(event, newValue) => {
        setSelectedPostcode(newValue)
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
                {loading ? (
                  <CircularProgress color='inherit' size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            )
          }}
        />
      )}
    />
  )
}

export default Search
