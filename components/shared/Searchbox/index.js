import React from 'react';
import { useRouter } from 'next/router';

import SearchIcon from '@material-ui/icons/Search';

import * as Styled from './styles';

const Searchbox = ({ searchInputRef, onSearchClick }) => {
  const router = useRouter();
  const { q: searchTerm } = router.query;

  return (
    <Styled.Form onSubmit={onSearchClick}>
      <input
        type="text"
        placeholder="搜尋"
        defaultValue={searchTerm || ''}
        ref={searchInputRef}
      />
      <button type="submit">
        <SearchIcon fontSize="small" />
      </button>
    </Styled.Form>
  );
};

export default Searchbox;
