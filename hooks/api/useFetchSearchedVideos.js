import { useState, useEffect, useRef } from 'react';

import { getSearchedVideos } from '../../services/youtubeService';

import { getUniqueVideoBy } from '../../utils';

const useFetchSearchedVideos = (
  { initVideos, initNextPageToken },
  searchTerm
) => {
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState(initVideos);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const nextPageTokenRef = useRef(initNextPageToken);

  useEffect(() => {
    setPageNumber(1);
    setVideos(initVideos);
    nextPageTokenRef.current = initNextPageToken;
  }, [searchTerm, initVideos, initNextPageToken]);

  useEffect(() => {
    const searchVideos = async (searchQuery) => {
      if (!searchQuery) {
        return;
      }

      setLoading(true);

      try {
        const { data } = await getSearchedVideos(
          searchQuery,
          nextPageTokenRef.current
        );

        if (data.hasOwnProperty('nextPageToken')) {
          nextPageTokenRef.current = data.nextPageToken;
          setHasMore(true);
        } else {
          nextPageTokenRef.current = '';
          setHasMore(false);
        }

        // As search api sometimes would return same video => remove duplicated video
        setVideos((prevVideos) =>
          getUniqueVideoBy([...prevVideos, ...data.items], 'etag')
        );
      } catch (error) {
        console.log(error.message);
        setError(error.message);
      }

      setLoading(false);
    };

    if (pageNumber > 1) {
      searchVideos(searchTerm);
    }
  }, [searchTerm, pageNumber]);

  return [loading, videos, error, hasMore, setPageNumber];
};

export default useFetchSearchedVideos;
