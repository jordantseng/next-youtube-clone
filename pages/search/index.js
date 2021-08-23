import { useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { google } from 'googleapis';

import Header from '../../components/shared/Header';
import Sidebar from '../../components/shared/Sidebar';
import VideoCard from '../../components/search-page/VideoCard';
import Loader from '../../components/ui/Loader';
import NoResults from '../../components/search-page/NoResults';

import useFetchSearchedVideos from '../../hooks/api/useFetchSearchedVideos';
import useOnScreen from '../../hooks/useOnScreen';

const Container = styled.div`
  display: flex;
`;

const Primary = styled.div`
  flex: 1;
  display: flex;
  background: #f9f9f9;
  min-height: 100vh;
  justify-content: center;
  margin-left: ${({ sidebarOpen }) => {
    if (sidebarOpen === null) {
      return '0px';
    }
    return sidebarOpen ? '240px' : '72px';
  }};

  @media only screen and (max-width: 1187px) {
    margin-left: 0;
  }
`;

const VideoCards = styled.div`
  padding: 24px 16px;
`;

const SearchPage = ({ initVideosData, sidebarOpen, setSidebarOpen }) => {
  const router = useRouter();
  const { q: searchTerm } = router.query;
  const [loading, videos, error, hasMore, setPageNumber] =
    useFetchSearchedVideos(initVideosData, searchTerm);
  const [visible, setLastVideo] = useOnScreen();

  useEffect(() => {
    if (visible && hasMore) {
      setPageNumber((page) => page + 1);
    }
  }, [visible, hasMore]);

  return (
    <>
      <Header setSidebarOpen={setSidebarOpen} />
      <Container>
        <Sidebar sidebarOpen={sidebarOpen} />
        <Primary sidebarOpen={sidebarOpen}>
          {!initVideosData.initVideos.length ? (
            <NoResults />
          ) : (
            <VideoCards>
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
                      channelThumbnail={
                        video.channelDetails.thumbnails.default.url
                      }
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
                    channelThumbnail={
                      video.channelDetails.thumbnails.default.url
                    }
                    description={video.snippet.description}
                  />
                );
              })}
              {loading && <Loader />}
            </VideoCards>
          )}
        </Primary>
      </Container>
    </>
  );
};

// getStaticProps => does not support URL query string
// getInitialProps => can't resolve 'child_process' error
export const getServerSideProps = async (context) => {
  const searchedVideosData = await google.youtube('v3').search.list({
    q: context.query.q,
    key: process.env.NEXT_PUBLIC_YOUTUBE_KEY,
    part: 'snippet',
    type: 'video',
    eventType: 'completed',
    regionCode: 'TW',
    maxResults: 12,
  });

  if (!searchedVideosData.data.items.length) {
    return {
      props: {
        initVideosData: {
          initVideos: [],
          initNextPageToken: null,
        },
      },
    };
  }

  // TODO: if no data => redirect to 404 page

  const videoIds = searchedVideosData.data.items
    .map((item) => item.id.videoId)
    .join();

  const channelIds = searchedVideosData.data.items
    .map((item) => item.snippet.channelId)
    .join();

  const videosData = await google.youtube('v3').videos.list({
    key: process.env.NEXT_PUBLIC_YOUTUBE_KEY,
    part: 'contentDetails,statistics',
    id: videoIds,
  });

  const channelsData = await google.youtube('v3').channels.list({
    key: process.env.NEXT_PUBLIC_YOUTUBE_KEY,
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
