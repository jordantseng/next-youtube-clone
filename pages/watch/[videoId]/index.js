import { useEffect } from 'react';

import Video from '../../../components/video-page/Video';
import Comments from '../../../components/video-page/Comments';
import RecommendVideos from '../../../components/video-page/RecommendVideos';
import Loader from '../../../components/ui/Loader';
import Button from '../../../components/ui/Button';

import useFetchRecommendVideos from '../../../hooks/api/useFetchRecommendVideos';
import useFetchComments from '../../../hooks/api/useFetchComments';
import useOnScreen from '../../../hooks/useOnScreen';
import useMediaQuery from '../../../hooks/useMediaQuery';

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
  sidebarOpen,
}) => {
  const [
    loadingRecommendVideos,
    recommendVideos,
    recommendVideosError,
    hasMoreRecommendVideos,
    setRecommendVideosPageNumber,
  ] = useFetchRecommendVideos(videoId);
  const [
    loadingComments,
    comments,
    commentsError,
    hasMoreComments,
    setCommentsPageNumber,
  ] = useFetchComments(videoId);
  const [lastRecommendVideoVisible, setLastRecommendVideo] = useOnScreen();
  const [lastCommentVisible, setLastComment] = useOnScreen();
  const largeScreen = useMediaQuery('(min-width: 1000px)');

  useEffect(() => {
    if (hasMoreRecommendVideos && lastRecommendVideoVisible) {
      setRecommendVideosPageNumber((page) => page + 1);
    }
  }, [hasMoreRecommendVideos, lastRecommendVideoVisible]);

  useEffect(() => {
    if (lastCommentVisible && hasMoreComments) {
      setCommentsPageNumber((pageNumber) => pageNumber + 1);
    }
  }, [lastCommentVisible, hasMoreComments]);

  return (
    <Styled.VideoPageContainer sidebarOpen={sidebarOpen}>
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
        {largeScreen && (
          <Comments
            loading={loadingComments}
            comments={comments}
            setLastComment={setLastComment}
          />
        )}
      </Styled.VideoContainer>
      <Styled.RecommendVideosContainer>
        {largeScreen ? (
          <RecommendVideos
            videos={recommendVideos}
            setLastRecommendVideo={setLastRecommendVideo}
          />
        ) : (
          <>
            <RecommendVideos videos={recommendVideos} />
            {loadingRecommendVideos ? (
              <Loader />
            ) : (
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                onClick={() => setRecommendVideosPageNumber((page) => page + 1)}
              >
                顯示完整資訊
              </Button>
            )}
            <Comments
              loading={loadingComments}
              comments={comments}
              setLastComment={setLastComment}
            />
          </>
        )}
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
