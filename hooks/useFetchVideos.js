import { useState, useEffect, useRef } from 'react';
import { getVideos, getChannels } from '../services/youtubeService';

const useFetchVideos = (pageNumber) => {
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const nextPageTokenRef = useRef('');

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);

      try {
        const videosData = await getVideos({
          part: 'contentDetails,snippet,statistics',
          chart: 'mostPopular',
          regionCode: 'TW',
          maxResults: 12,
          pageToken: nextPageTokenRef.current,
        });

        if (videosData.hasOwnProperty('nextPageToken')) {
          nextPageTokenRef.current = videosData.nextPageToken;
          setHasMore(true);
        } else {
          nextPageTokenRef.current = '';
          setHasMore(false);
        }

        const channelIds = videosData.items
          .map((item) => item.snippet.channelId)
          .join();

        const channelsData = await getChannels({
          part: 'snippet',
          id: channelIds,
        });

        const newVideos = videosData.items.map((video) => {
          const channelDetails = channelsData.items.find(
            (channel) => video.snippet.channelId === channel.id
          );

          return { ...video, channelDetails };
        });

        setVideos((preVideos) => [...preVideos, ...newVideos]);
      } catch (error) {
        console.log(error.message);
        setError(error.message);
      }

      setLoading(false);
    };

    fetchVideos();
  }, [pageNumber]);

  return { loading, videos, error, hasMore };
};

export default useFetchVideos;
