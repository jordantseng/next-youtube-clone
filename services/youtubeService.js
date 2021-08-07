import axios from 'axios';

const youtubeApi = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    key: process.env.YOUTUBE_KEY,
  },
});

export const getPopularVideos = async (pageToken) => {
  const { data: videosData } = await youtubeApi.get('/videos', {
    params: {
      part: 'contentDetails,snippet,statistics',
      chart: 'mostPopular',
      regionCode: 'TW',
      maxResults: 12,
      pageToken,
    },
  });

  const channelIds = videosData.items
    .map((item) => item.snippet.channelId)
    .join();

  const { data: channelsData } = await youtubeApi.get('/channels', {
    params: {
      part: 'snippet',
      id: channelIds,
    },
  });

  const newVideos = videosData.items.map((video) => {
    const channelDetails = channelsData.items.find(
      (channel) => video.snippet.channelId === channel.id
    );

    return { ...video, channelDetails };
  });

  return { data: { ...videosData, items: newVideos } };
};

export const getSearchedVideos = async (searchQuery, pageToken) => {
  const { data: searchedVideosData } = await youtubeApi.get('/search', {
    params: {
      q: searchQuery,
      part: 'snippet',
      type: 'video',
      eventType: 'completed',
      regionCode: 'TW',
      maxResults: 12,
      pageToken,
    },
  });

  const videoIds = searchedVideosData.items
    .map((item) => item.id.videoId)
    .join();

  const channelIds = searchedVideosData.items
    .map((item) => item.snippet.channelId)
    .join();

  const { data: videosData } = await youtubeApi.get('/videos', {
    params: {
      part: 'contentDetails,statistics',
      id: videoIds,
    },
  });

  const { data: channelsData } = await youtubeApi.get('/channels', {
    params: {
      part: 'snippet',
      id: channelIds,
    },
  });

  const newVideos = searchedVideosData.items.map((searchedVideo) => {
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

  return { data: { ...searchedVideosData, items: newVideos } };
};

export const getRecommendVideos = async (videoId, pageToken) => {
  const { data: recommendVideosData } = await youtubeApi.get('/search', {
    params: {
      part: 'snippet',
      relatedToVideoId: videoId,
      maxResults: 50,
      type: 'video',
      pageToken,
    },
  });

  const videoIds = recommendVideosData.items
    .map((item) => item.id.videoId)
    .join();

  const { data: videosData } = await youtubeApi.get('/videos', {
    params: {
      part: 'contentDetails,statistics',
      id: videoIds,
    },
  });

  const newVideos = videosData.items.map((video) => {
    const recommendVideoData = recommendVideosData.items.find(
      (recommendVideo) => recommendVideo.id.videoId === video.id
    );

    return {
      ...recommendVideoData,
      contentDetails: video.contentDetails,
      statistics: video.statistics,
    };
  });

  return { data: { ...recommendVideosData, items: newVideos } };
};

export const getVideoComments = async (videoId, pageToken) => {
  const { data: videoCommentsData } = await youtubeApi.get('/commentThreads', {
    params: {
      part: 'snippet,replies',
      videoId,
      pageToken,
    },
  });

  return { data: { ...videoCommentsData } };
};
