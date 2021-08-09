import { useState, useEffect } from 'react';

import VideoCard from '../components/home-page/VideoCard';
import Loader from '../components/ui/Loader';

import useFetchPopularVideos from '../hooks/api/useFetchPopularVideos';
import useOnScreen from '../hooks/useOnScreen';

import * as Styled from './styles';

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
      <Styled.HomePageContainer sidebarOpen={sidebarOpen}>
        <Styled.VideoCards>
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
        </Styled.VideoCards>
        {loading && <Loader />}
      </Styled.HomePageContainer>
    </>
  );
};

export default Home;
