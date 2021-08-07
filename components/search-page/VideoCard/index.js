import Image from 'next/image';
import { useRouter } from 'next/router';

import Avatar from '@material-ui/core/Avatar';

import * as Styled from './styles';

import {
  transformDuration,
  transformTimeStamp,
  transformViews,
} from '../../../utils';

const VideoCard = ({
  videoId,
  title,
  viewCount,
  videoTimeStamp,
  videoDuration,
  videoThumbnail,
  channel,
  channelThumbnail,
  description,
  setLastVideo,
}) => {
  const router = useRouter();

  const onVideoInfoClick = () => {
    router.push(`/watch/${videoId}`);
  };

  return (
    <Styled.VideoCard ref={setLastVideo}>
      <Styled.VideoThumbnail href={`/watch/${videoId}`}>
        <Image
          src={videoThumbnail}
          alt=""
          layout="responsive"
          width="320"
          height="180"
        />
        <Styled.VideoTimeStamp>
          {transformDuration(videoDuration)}
        </Styled.VideoTimeStamp>
      </Styled.VideoThumbnail>
      <Styled.VideoInfo onClick={onVideoInfoClick}>
        <h4>{title}</h4>
        <p>
          觀看次數：{transformViews(viewCount)} ・{' '}
          {transformTimeStamp(videoTimeStamp)}
        </p>
        <Styled.VideoChannel>
          <Avatar style={{ width: '30px', height: '30px' }}>
            <Image
              src={channelThumbnail}
              alt=""
              layout="fill"
              objectFit="cover"
            />
          </Avatar>
          <p>{channel}</p>
        </Styled.VideoChannel>
        <Styled.VideoDescription>{description}</Styled.VideoDescription>
      </Styled.VideoInfo>
    </Styled.VideoCard>
  );
};

export default VideoCard;
