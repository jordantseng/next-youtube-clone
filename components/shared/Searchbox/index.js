import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import * as Styled from "./styles";

const Searchbox = ({ onSearchClick, searchInputRef }) => {
  return (
    <Styled.Form onSubmit={onSearchClick}>
      <input type="text" placeholder="搜尋" ref={searchInputRef} />
      <button type="submit">
        <SearchIcon fontSize="small" />
      </button>
    </Styled.Form>
  );
};

export default Searchbox;
