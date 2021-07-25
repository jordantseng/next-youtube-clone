import { useState, useEffect, useRef } from 'react';
import {
  getVideos,
  getSearchedVideos,
  getChannels,
} from '../services/youtubeService';

const combineData = (searchedVideosData, videosData, channelsData) =>
  searchedVideosData.items.map((searchedVideo) => {
    const { contentDetails, statistics } = videosData.items.find(
      (video) => searchedVideo.id.videoId === video.id
    );

    const { snippet: channelDetails } = channelsData.items.find(
      (channel) => searchedVideo.snippet.channelId === channel.id
    );

    return {
      ...searchedVideo,
      contentDetails,
      statistics,
      channelDetails,
    };
  });

const getUniqueVideoBy = (videos, key) => {
  return [...new Map(videos.map((video) => [video[key], video])).values()];
};

const useSearchVideos = (searchTerm, pageNumber) => {
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const nextPageTokenRef = useRef('');

  useEffect(() => {
    setVideos([]);
    nextPageTokenRef.current = '';
  }, [searchTerm]);

  useEffect(() => {
    const searchVideos = async (searchQuery) => {
      if (!searchQuery) {
        return;
      }

      setLoading(true);

      try {
        const searchedVideosData = await getSearchedVideos({
          q: searchQuery,
          part: 'snippet',
          type: 'video',
          eventType: 'completed',
          regionCode: 'TW',
          maxResults: 12,
          pageToken: nextPageTokenRef.current,
        });

        if (searchedVideosData.hasOwnProperty('nextPageToken')) {
          nextPageTokenRef.current = searchedVideosData.nextPageToken;
          setHasMore(true);
        } else {
          nextPageTokenRef.current = '';
          setHasMore(false);
        }

        const videoIds = searchedVideosData.items
          .map((item) => item.id.videoId)
          .join();

        const channelIds = searchedVideosData.items
          .map((item) => item.snippet.channelId)
          .join();

        const videosData = await getVideos({
          part: 'contentDetails,statistics',
          id: videoIds,
        });

        const channelsData = await getChannels({
          part: 'snippet',
          id: channelIds,
        });

        const newVideos = combineData(
          searchedVideosData,
          videosData,
          channelsData
        );

        // As search api sometimes would return same video => remove duplicated video
        setVideos((prevVideos) =>
          getUniqueVideoBy([...prevVideos, ...newVideos], 'etag')
        );
      } catch (error) {
        console.log(error.message);
        setError(error.message);
      }

      setLoading(false);
    };

    searchVideos(searchTerm);
  }, [searchTerm, pageNumber]);

  return { loading, videos, error, hasMore };
};

export default useSearchVideos;
