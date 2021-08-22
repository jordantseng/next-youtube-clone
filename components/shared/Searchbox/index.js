import { useRef } from 'react';
import { useRouter } from 'next/router';

import SearchIcon from '@material-ui/icons/Search';

import * as Styled from './styles';

const Searchbox = () => {
  const router = useRouter();
  const searchInputRef = useRef();
  const { q: searchTerm } = router.query;

  const onSearchClick = (e) => {
    if (!searchInputRef.current.value) {
      return;
    }

    e.preventDefault();
    router.push(`/search?q=${searchInputRef.current.value}`);
  };

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
