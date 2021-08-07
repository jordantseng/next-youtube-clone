import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { google } from 'googleapis';

import VideoCard from '../../components/search-page/VideoCard';
import Loader from '../../components/ui/Loader';

import useSearchVideos from '../../hooks/api/useSearchVideos';
import useOnScreen from '../../hooks/useOnScreen';

import * as Styled from './styles';

const SearchPage = ({ initVideosData }) => {
  const router = useRouter();
  const { q: searchTerm } = router.query;
  const { loading, videos, error, hasMore, setPageNumber } = useSearchVideos(
    initVideosData,
    searchTerm
  );
  const [visible, setLastVideo] = useOnScreen();

  useEffect(() => {
    if (visible && hasMore) {
      setPageNumber((page) => page + 1);
    }
  }, [visible, hasMore]);

  return (
    <Styled.SearchPageContainer>
      <Styled.VideoCards>
        {videos.map((video, index) => {
          const isLastVideo = videos.length === index + 1;
          if (isLastVideo) {
            return (
              <VideoCard
                key={video.id.videoId}
                videoId={video.id.videoId}
                title={video.snippet.title}
                viewCount={video.statistics.viewCount}
                videoTimeStamp={video.snippet.publishedAt}
                videoDuration={video.contentDetails.duration}
                videoThumbnail={video.snippet.thumbnails.medium.url}
                channel={video.channelDetails.title}
                channelThumbnail={video.channelDetails.thumbnails.default.url}
                description={video.snippet.description}
                setLastVideo={setLastVideo}
              />
            );
          }
          return (
            <VideoCard
              key={video.id.videoId}
              videoId={video.id.videoId}
              title={video.snippet.title}
              viewCount={video.statistics.viewCount}
              videoTimeStamp={video.snippet.publishedAt}
              videoDuration={video.contentDetails.duration}
              videoThumbnail={video.snippet.thumbnails.medium.url}
              channel={video.channelDetails.title}
              channelThumbnail={video.channelDetails.thumbnails.default.url}
              description={video.snippet.description}
            />
          );
        })}
        {loading && <Loader />}
      </Styled.VideoCards>
    </Styled.SearchPageContainer>
  );
};

// getStaticProps => does not support URL query string
// getInitialProps => can't resolve 'child_process' error
export const getServerSideProps = async (context) => {
  const searchedVideosData = await google.youtube('v3').search.list({
    q: context.query.q,
    key: process.env.YOUTUBE_KEY,
    part: 'snippet',
    type: 'video',
    eventType: 'completed',
    regionCode: 'TW',
    maxResults: 12,
  });

  const videoIds = searchedVideosData.data.items
    .map((item) => item.id.videoId)
    .join();

  const channelIds = searchedVideosData.data.items
    .map((item) => item.snippet.channelId)
    .join();

  const videosData = await google.youtube('v3').videos.list({
    key: process.env.YOUTUBE_KEY,
    part: 'contentDetails,statistics',
    id: videoIds,
  });

  const channelsData = await google.youtube('v3').channels.list({
    key: process.env.YOUTUBE_KEY,
    part: 'snippet',
    id: channelIds,
  });

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

  const newVideos = combineData(
    searchedVideosData.data,
    videosData.data,
    channelsData.data
  );

  return {
    props: {
      initVideosData: {
        initVideos: newVideos,
        initNextPageToken: searchedVideosData.data.nextPageToken,
      },
    },
  };
};

export default SearchPage;
