import React, { useState, useEffect } from 'react';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";

const QuizNameSearch = () => {
  // const handleFocus = (event) => {
  //   event.preventDefault();
  //   const { target } = event;
  //   target.setSelectionRange(0, target.value.length);
  // };
  // this.handleFocus = this.handleFocus.bind(this);

  return (
    <OutlinedInput
      id='quiz-name-search-bar'
      placeholder='by name...'
      size='small'
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