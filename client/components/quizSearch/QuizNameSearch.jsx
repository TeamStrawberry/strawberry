import React, { useState, useEffect } from 'react';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";

const QuizNameSearch = () => {

/* This will need to be implemented when I have access to real data */
  // const handleFocus = (e) => {
  //   e.preventDefault();
  //   const { target } = e;
  //   target.setSelectionRange(0, target.value.length);
  // };
  // this.handleFocus = this.handleFocus.bind(this);

  return (
    <OutlinedInput
      id='quiz-name-search-bar'
      placeholder='by name...'
      size='small'
    /* This will need to be implemented when I have access to real data */
      // onChange={(e) => handleSearch(e.target.value)}
      // onFocus={handleFocus}
      fullWidth
      style={{
        fontSize: 14,
        fontWeight: 600,
      }}
      endAdornment={
        <InputAdornment position="end">
          <SearchIcon></SearchIcon>
        </InputAdornment>
      }
    />
  );
}

export default QuizNameSearch;