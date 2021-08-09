import { useState, useEffect, useRef } from 'react';
import { getPopularVideos } from '../../services/youtubeService';

const useFetchPopularVideos = (pageNumber) => {
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const nextPageTokenRef = useRef('');

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);

      try {
        const { data } = await getPopularVideos(nextPageTokenRef.current);

        if (data.hasOwnProperty('nextPageToken')) {
          nextPageTokenRef.current = data.nextPageToken;
          setHasMore(true);
        } else {
          nextPageTokenRef.current = '';
          setHasMore(false);
        }

        setVideos((preVideos) => [...preVideos, ...data.items]);
      } catch (error) {
        console.log(error.message);
        setError(error.message);
      }

      setLoading(false);
    };

    fetchVideos();
  }, [pageNumber]);

  return [loading, videos, error, hasMore];
};

export default useFetchPopularVideos;
