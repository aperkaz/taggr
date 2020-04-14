import React from "react";
import { view } from "@risingstack/react-easy-state";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Search from "@material-ui/icons/Search";
import debounce from "lodash.debounce";

// TODO: deprecated
const SearchInput = view(({ onChange }) => (
  <TextField
    label="search by tags"
    placeholder="ex. cat"
    onChange={debounce(onChange, 300)}
    InputProps={{
      endAdornment: (
        <InputAdornment position="start">
          <Search />
        </InputAdornment>
      ),
    }}
  />
));

export default SearchInput;
