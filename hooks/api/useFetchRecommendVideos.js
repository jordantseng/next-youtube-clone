import { useState, useEffect, useRef } from 'react';
import { getRecommendVideos } from '../../services/youtubeService';

import { getUniqueVideoBy } from '../../lib/utils';

const useFetchRecommendVideos = (videoId) => {
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const nextPageTokenRef = useRef('');

  useEffect(() => {
    const fetchRecommendVideos = async () => {
      setLoading(true);

      try {
        const { data } = await getRecommendVideos(
          videoId,
          nextPageTokenRef.current
        );

        if (data.hasOwnProperty('nextPageToken')) {
          nextPageTokenRef.current = data.nextPageToken;
          setHasMore(true);
        } else {
          nextPageTokenRef.current = '';
          setHasMore(false);
        }

        setVideos((preVideos) =>
          getUniqueVideoBy([...preVideos, ...data.items], 'etag')
        );
      } catch (error) {
        console.log(error.message);
        setError(error.message);
      }

      setLoading(false);
    };

    fetchRecommendVideos();
  }, [videoId, pageNumber]);

  return [loading, videos, error, hasMore, setPageNumber];
};

export default useFetchRecommendVideos;
