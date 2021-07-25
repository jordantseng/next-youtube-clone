import { useState, useEffect } from 'react';

import VideoCard from '../../components/search-page/VideoCard';
import Loader from '../../components/shared/Loader';

import useSearchVideos from '../../hooks/useSearchVideos';
import useOnScreen from '../../hooks/useOnScreen';

import * as Styled from './styles';

const SearchPage = ({ searchTerm }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const { loading, videos, error, hasMore } = useSearchVideos(
    searchTerm,
    pageNumber
  );
  const [visible, setLastVideo] = useOnScreen();

  useEffect(() => {
    setPageNumber(1);
  }, [searchTerm]);

  useEffect(() => {
    if (visible && hasMore) {
      setPageNumber((page) => page + 1);
    }
  }, [visible, hasMore]);

  return (
    <Styled.SearchPageContainer>
      {videos.map((video, index) => {
        const isLastVideo = videos.length === index + 1;
        if (isLastVideo) {
          return (
            <VideoCard
              key={video.id.videoId}
              title={video.snippet.title}
              views={video.statistics.viewCount}
              timestamp={video.snippet.publishedAt}
              duration={video.contentDetails.duration}
              thumbnail={video.snippet.thumbnails.medium.url}
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
            title={video.snippet.title}
            views={video.statistics.viewCount}
            timestamp={video.snippet.publishedAt}
            duration={video.contentDetails.duration}
            thumbnail={video.snippet.thumbnails.medium.url}
            channel={video.channelDetails.title}
            channelThumbnail={video.channelDetails.thumbnails.default.url}
            description={video.snippet.description}
          />
        );
      })}
      {loading && <Loader />}
    </Styled.SearchPageContainer>
  );
};

export default SearchPage;
