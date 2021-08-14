import Image from 'next/image';
import { useRouter } from 'next/router';

import Avatar from '@material-ui/core/Avatar';

import * as Styled from './styles';

import {
  transformDuration,
  transformTimeStamp,
  transformViews,
} from '../../../lib/utils';

const VideoCard = ({
  videoId,
  title,
  viewCount,
  videoTimeStamp,
  videoDuration,
  videoThumbnail,
  channel,
  channelThumbnail,
  setLastVideo,
}) => {
  const router = useRouter();

  const onVideoCardClick = () => {
    router.push(`/watch/${videoId}`);
  };

  return (
    <Styled.VideoCardContainer ref={setLastVideo} onClick={onVideoCardClick}>
      <Styled.VideoThumbnail>
        <Image
          src={videoThumbnail.url}
          alt=""
          layout="responsive"
          width="320"
          height="180"
        />
        <Styled.VideoTimeStamp>
          {transformDuration(videoDuration)}
        </Styled.VideoTimeStamp>
      </Styled.VideoThumbnail>
      <Styled.VideoInfo>
        <Avatar>
          <Image src={channelThumbnail.url} alt="" layout="fill" />
        </Avatar>
        <Styled.VideoText>
          <h4>{title}</h4>
          <p>{channel}</p>
          <p>
            觀看次數：{transformViews(viewCount)} ・{' '}
            {transformTimeStamp(videoTimeStamp)}
          </p>
        </Styled.VideoText>
      </Styled.VideoInfo>
    </Styled.VideoCardContainer>
  );
};

export default VideoCard;
