import { useState, useEffect } from "react";
import {
  getVideos,
  getSearchedVideos,
  getChannels,
} from "../services/youtubeService";

const transformData = (searchedVideosData, videosData, channelsData) =>
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

const useSearchVideos = (defaultSearchTerm) => {
  const [videos, setVideos] = useState([]);

  const searchVideos = async (searchTerm) => {
    if (!searchTerm) {
      return;
    }

    const searchedVideosData = await getSearchedVideos({
      q: searchTerm,
      part: "snippet",
      type: "video",
      regionCode: "TW",
      maxResults: 12,
    });

    const videoIds = [];
    const channelIds = [];
    searchedVideosData.items.forEach((searchedVideo) => {
      const { videoId } = searchedVideo.id;
      const { channelId } = searchedVideo.snippet;
      videoIds.push(videoId);
      channelIds.push(channelId);
    });

    const videosData = await getVideos({
      part: "contentDetails,statistics",
      id: videoIds.join(),
    });

    const channelsData = await getChannels({
      part: "snippet",
      id: channelIds.join(),
    });

    const result = transformData(searchedVideosData, videosData, channelsData);

    setVideos(result);
  };

  useEffect(() => {
    searchVideos(defaultSearchTerm);
  }, [defaultSearchTerm]);

  return [videos, searchVideos];
};

export default useSearchVideos;
