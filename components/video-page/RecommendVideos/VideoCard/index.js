import Image from 'next/image';
import Router, { useRouter } from 'next/router';

import * as Styled from './styles';

import {
  transformDuration,
  transformViews,
  transformTimeStamp,
} from '../../../../lib/utils';

const VideoCard = ({
  videoId,
  videoThumbnail,
  videoDuration,
  videoTitle,
  channelTitle,
  viewCount,
  publishedAt,
  setLastRecommendVideo,
}) => {
  const router = useRouter();

  const onVideoInfoClick = () => {
    router.push(`/watch/${videoId}`);
  };

  return (
    <Styled.VideoCardContainer ref={setLastRecommendVideo}>
      <Styled.VideoThumbnail href={`/watch/${videoId}`}>
        <Image
          src={videoThumbnail.url}
          alt=""
          layout="fill"
          objectFit="cover"
        />
        <Styled.VideoTimeStamp>
          {transformDuration(videoDuration)}
        </Styled.VideoTimeStamp>
      </Styled.VideoThumbnail>
      <Styled.VideoInfo onClick={onVideoInfoClick}>
        <Styled.VideoTitle>{videoTitle}</Styled.VideoTitle>
        <Styled.VideoChannelTitle>{channelTitle}</Styled.VideoChannelTitle>
        <Styled.VideoStatistics>
          <div>
            觀看次數：{transformViews(viewCount)}・
            {transformTimeStamp(publishedAt)}
          </div>
        </Styled.VideoStatistics>
      </Styled.VideoInfo>
    </Styled.VideoCardContainer>
  );
};

export default VideoCard;
