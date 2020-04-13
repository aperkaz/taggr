import React from "react";
import { view } from "@risingstack/react-easy-state";

const SearchInput = view(({ onChange }) => <input onChange={onChange}></input>);

export default SearchInput;
