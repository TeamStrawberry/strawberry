import React from "react";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";

function FriendSearch() {
  var handleFocus = (event) => {
    event.preventDefault();
    const { target } = event;
    target.setSelectionRange(0, target.value.length);
  };

  handleFocus = handleFocus.bind(this);

  return (
    <OutlinedInput
      id="friend-search-bar"
      placeholder="search for a friend..."
      size="small"
      // onChange={(e) => handleSearch(e.target.value)}
      onFocus={handleFocus}
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

export default FriendSearch;