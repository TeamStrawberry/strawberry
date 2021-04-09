import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';

const QuizNameSearch = ({setCriteria, setOpen}) => {

  const [search, updateSearch] = useState(null);

  const handleChange = (e) => {
    updateSearch(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCriteria(search.substring(1));
    setOpen(false);
  };

  const handleKeyPress = (e) => {
    if(e.key === 'Enter'){
      setCriteria(search.substring(1));
      setOpen(false);
    }
  }

  return (
    <TextField
      id='quiz-name-search-bar'
      placeholder='by name...'
      size='small'
      onChange={handleChange}
      onKeyPress={handleKeyPress}
      fullWidth
      style={{
        fontSize: 14,
        fontWeight: 600,
      }}
      InputProps={{
        endAdornment: <InputAdornment position='end'>
        <SearchIcon style={{ cursor: 'pointer' }} onClick={handleSearch} />
      </InputAdornment>
      }}
    />
  );
}

export default QuizNameSearch;