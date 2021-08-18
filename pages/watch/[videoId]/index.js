import { useEffect } from 'react';
import styled from 'styled-components';

import Header from '../../../components/shared/Header';
import Sidebar from '../../../components/shared/Sidebar';
import Video from '../../../components/video-page/Video';
import Comments from '../../../components/video-page/Comments';
import RecommendVideos from '../../../components/video-page/RecommendVideos';
import Loader from '../../../components/ui/Loader';
import Button from '../../../components/ui/Button';

import useFetchRecommendVideos from '../../../hooks/api/useFetchRecommendVideos';
import useFetchComments from '../../../hooks/api/useFetchComments';
import useOnScreen from '../../../hooks/useOnScreen';
import useMediaQuery from '../../../hooks/useMediaQuery';

const Container = styled.div`
  display: flex;
`;

const Primary = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  padding: 40px 20px 20px 20px;
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

const VideoContainer = styled.div`
  flex: 1;
  padding-right: 16px;

  @media only screen and (max-width: 1000px) {
    padding: 0;
  }
`;

const RecommendVideosContainer = styled.div`
  width: 330px;

  @media only screen and (max-width: 1000px) {
    width: 100%;
    padding-top: 16px;
  }
`;

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
  setSidebarOpen,
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
    <>
      <Header setSidebarOpen={setSidebarOpen} />
      <Container>
        <Sidebar sidebarOpen={sidebarOpen} />
        <Primary sidebarOpen={sidebarOpen}>
          <VideoContainer>
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
          </VideoContainer>
          <RecommendVideosContainer>
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
                    onClick={() =>
                      setRecommendVideosPageNumber((page) => page + 1)
                    }
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
          </RecommendVideosContainer>
        </Primary>
      </Container>
    </>
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
    key: process.env.NEXT_PUBLIC_YOUTUBE_KEY,
    part: 'snippet,contentDetails,statistics',
  });

  const video = videoData.items[0];

  const { data: channelData } = await google.youtube('v3').channels.list({
    part: 'snippet,statistics',
    key: process.env.NEXT_PUBLIC_YOUTUBE_KEY,
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
