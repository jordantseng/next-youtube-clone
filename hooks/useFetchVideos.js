import { useState, useEffect } from "react";
import { getVideos, getChannels } from "../services/youtubeService";

const useFetchVideos = () => {
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const videosData = await getVideos({
          part: "contentDetails,snippet,statistics",
          chart: "mostPopular",
          regionCode: "TW",
          maxResults: 30,
        });

        const channelIds = [];
        videosData.items.forEach((item) => {
          const { channelId } = item.snippet;
          channelIds.push(channelId);
        });

        const channelsData = await getChannels({
          part: "snippet",
          id: channelIds.join(),
        });

        const result = videosData.items.map((video) => {
          const channelDetails = channelsData.items.find(
            (channel) => video.snippet.channelId === channel.id
          );

          return { ...video, channelDetails };
        });

        setVideos(result);
      } catch (error) {
        setError(error);
      }

      setLoading(false);
    };

    fetchVideos();
  }, []);

  return { loading, videos, error };
};

export default useFetchVideos;
