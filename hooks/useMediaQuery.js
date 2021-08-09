import { useState, useEffect } from 'react';
import useWindowDimension from './useWindowDimension';

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);
  const { width } = useWindowDimension();

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(!!media.matches);

    const updateMatch = () => {
      setMatches(media.matches);
    };
    media.addEventListener('change', updateMatch);

    return () => media.removeEventListener('change', updateMatch);
  }, [matches, query, width]);

  return matches;
};

export default useMediaQuery;
