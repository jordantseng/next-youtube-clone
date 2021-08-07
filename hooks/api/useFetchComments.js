import { useState, useEffect, useRef } from 'react';
import { getVideoComments } from '../../services/youtubeService';

const useFetchComments = (videoId) => {
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const nextPageTokenRef = useRef('');

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);

      try {
        const { data } = await getVideoComments(
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

        setComments((prevComments) => [...prevComments, ...data.items]);
      } catch (error) {
        console.log(error.message);
        setError(error.message);
      }

      setLoading(false);
    };

    fetchComments();
  }, [videoId, pageNumber]);

  return { loading, comments, error, hasMore, setPageNumber };
};

export default useFetchComments;
