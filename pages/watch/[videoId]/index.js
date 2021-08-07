import { useEffect } from 'react';

import Video from '../../../components/video-page/Video';
import Comments from '../../../components/video-page/Comments';
import RecommendVideos from '../../../components/video-page/RecommendVideos';
import Loader from '../../../components/ui/Loader';
import Button from '../../../components/ui/Button';

import useFetchRecommendVideos from '../../../hooks/api/useFetchRecommendVideos';
import useOnScreen from '../../../hooks/useOnScreen';
import useWindowDimension from '../../../hooks/useWindowDimension';

import * as Styled from './styles';

const VideoPage = ({
  videoId,
  title,
  viewCount,
  videoTimeStamp,
  likeCount,
  dislikeCount,
  channel,
  subscriberCount,
  channelThumbnail,
  videoDescription,
}) => {
  const { loading, videos, error, hasMore, setPageNumber } =
    useFetchRecommendVideos(videoId);
  const [visible, setLastRecommendVideo] = useOnScreen();
  const { width } = useWindowDimension();

  useEffect(() => {
    if (hasMore && visible) {
      setPageNumber((page) => page + 1);
    }
  }, [hasMore, visible]);

  return (
    <Styled.VideoPageContainer>
      <Styled.VideoContainer>
        <Video
          videoId={videoId}
          title={title}
          viewCount={viewCount}
          videoTimeStamp={videoTimeStamp}
          likeCount={likeCount}
          dislikeCount={dislikeCount}
          channel={channel}
          subscriberCount={subscriberCount}
          channelThumbnail={channelThumbnail}
          videoDescription={videoDescription}
        />
        {width > 1000 && <Comments videoId={videoId} />}
      </Styled.VideoContainer>
      <Styled.RecommendVideosContainer>
        {width > 1000 ? (
          <RecommendVideos
            videos={videos}
            setLastRecommendVideo={setLastRecommendVideo}
          />
        ) : (
          <>
            <RecommendVideos videos={videos} />
            {!loading && (
              <Button variant="outlined" color="primary" fullWidth>
                顯示完整資訊
              </Button>
            )}
            <Comments videoId={videoId} />
          </>
        )}
        {loading && <Loader />}
      </Styled.RecommendVideosContainer>
    </Styled.VideoPageContainer>
  );
};

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps = async (context) => {
  const { google } = require('googleapis');
  const { videoId } = context.params;

  const { data: videoData } = await google.youtube('v3').videos.list({
    id: videoId,
    key: process.env.YOUTUBE_KEY,
    part: 'snippet,contentDetails,statistics',
  });

  const video = videoData.items[0];

  const { data: channelData } = await google.youtube('v3').channels.list({
    part: 'snippet,statistics',
    key: process.env.YOUTUBE_KEY,
    id: video.snippet.channelId,
  });

  const channel = channelData.items[0];

  return {
    props: {
      video: video,
      videoId: video.id,
      title: video.snippet.title,
      viewCount: video.statistics.viewCount,
      videoTimeStamp: video.snippet.publishedAt,
      likeCount: video.statistics.likeCount,
      dislikeCount: video.statistics.dislikeCount,
      channel: channel.snippet.title,
      subscriberCount: channel.statistics.subscriberCount || null,
      channelThumbnail: channel.snippet.thumbnails.default,
      videoDescription: video.snippet.description,
    },
  };
};

export default VideoPage;
