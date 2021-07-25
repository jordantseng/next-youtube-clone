import { useState, useEffect } from 'react';
import VideoCard from '../components/home-page/VideoCard';
import Loader from '../components/shared/Loader';

import useFetchVideos from '../hooks/useFetchVideos';
import useOnScreen from '../hooks/useOnScreen';

import * as Styled from './styles';

const Home = () => {
  const [pageNumber, setPageNumber] = useState(1);

  const { loading, videos, error, hasMore } = useFetchVideos(pageNumber);
  const [visible, setLastVideo] = useOnScreen();

  useEffect(() => {
    if (visible && hasMore) {
      setPageNumber((page) => page + 1);
    }
  }, [visible, hasMore]);

  return (
    <>
      <Styled.HomePageContainer>
        <Styled.VideoCards>
          {videos.map((video, index) => {
            const isLastVideo = videos.length === index + 1;
            if (isLastVideo) {
              return (
                <VideoCard
                  key={video.id}
                  title={video.snippet.title}
                  views={video.statistics.viewCount}
                  timestamp={video.snippet.publishedAt}
                  duration={video.contentDetails.duration}
                  thumbnail={video.snippet.thumbnails.medium}
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
                title={video.snippet.title}
                views={video.statistics.viewCount}
                timestamp={video.snippet.publishedAt}
                duration={video.contentDetails.duration}
                thumbnail={video.snippet.thumbnails.medium}
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
