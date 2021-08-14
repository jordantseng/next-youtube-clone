import { useState, useEffect } from 'react';
import styled from 'styled-components';

import VideoCard from '../components/home-page/VideoCard';
import Loader from '../components/ui/Loader';

import useFetchPopularVideos from '../hooks/api/useFetchPopularVideos';
import useOnScreen from '../hooks/useOnScreen';

const HomePageContainer = styled.div`
  flex: 1;
  background-color: #f9f9f9;
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
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  padding: 24px 16px;
`;

const Home = ({ sidebarOpen }) => {
  const [pageNumber, setPageNumber] = useState(1);

  const [loading, videos, error, hasMore] = useFetchPopularVideos(pageNumber);
  const [visible, setLastVideo] = useOnScreen();

  useEffect(() => {
    if (visible && hasMore) {
      setPageNumber((page) => page + 1);
    }
  }, [visible, hasMore]);

  return (
    <>
      <HomePageContainer sidebarOpen={sidebarOpen}>
        <VideoCards>
          {videos.map((video, index) => {
            const isLastVideo = videos.length === index + 1;
            if (isLastVideo) {
              return (
                <VideoCard
                  key={video.id}
                  videoId={video.id}
                  title={video.snippet.title}
                  viewCount={video.statistics.viewCount}
                  videoTimeStamp={video.snippet.publishedAt}
                  videoDuration={video.contentDetails.duration}
                  videoThumbnail={video.snippet.thumbnails.medium}
                  channel={video.channelDetails.snippet.title}
                  channelThumbnail={
                    video.channelDetails.snippet.thumbnails.default
                  }
                  setLastVideo={setLastVideo}
                />
              );
            }
            return (
              <VideoCard
                key={video.id}
                videoId={video.id}
                title={video.snippet.title}
                viewCount={video.statistics.viewCount}
                videoTimeStamp={video.snippet.publishedAt}
                videoDuration={video.contentDetails.duration}
                videoThumbnail={video.snippet.thumbnails.medium}
                channel={video.channelDetails.snippet.title}
                channelThumbnail={
                  video.channelDetails.snippet.thumbnails.default
                }
              />
            );
          })}
        </VideoCards>
        {loading && <Loader />}
      </HomePageContainer>
    </>
  );
};

export default Home;
