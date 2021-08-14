import { useState } from 'react';
import Image from 'next/image';

import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ShareIcon from '@material-ui/icons/Share';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Avatar from '@material-ui/core/Avatar';

import Button from '../../ui/Button';

import * as Styled from './styles';

import {
  transformTimeStamp,
  transformViews,
  transformSubscribers,
} from '../../../lib/utils';

const Video = ({
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
  const [showMoreDescription, setShowMoreDescription] = useState(false);

  const descriptionLines = videoDescription.split(/\r\n|\r|\n/g);

  const onShowMoreDescriptionClick = () => {
    setShowMoreDescription(!showMoreDescription);
  };

  return (
    <>
      <Styled.VideoPlayer>
        <iframe
          // width="560"
          // height="349"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </Styled.VideoPlayer>
      <Styled.VideoInfo>
        <h3>{title}</h3>
        <Styled.VideoMeta>
          <Styled.VideoDetails>
            <div>觀看次數：{transformViews(viewCount)}</div>・
            <div>{transformTimeStamp(videoTimeStamp)}</div>
          </Styled.VideoDetails>
          <Styled.VideoActions>
            <Styled.VideoAction>
              <ThumbUpIcon />
              <p>{likeCount}</p>
            </Styled.VideoAction>
            <Styled.VideoAction>
              <ThumbDownIcon />
              <p>{dislikeCount}</p>
            </Styled.VideoAction>
            <Styled.VideoAction>
              <ShareIcon />
              <p>分享</p>
            </Styled.VideoAction>
            <Styled.VideoAction>
              <LibraryAddIcon />
              <p>儲存</p>
            </Styled.VideoAction>
            <Styled.VideoAction>
              <MoreHorizIcon />
            </Styled.VideoAction>
          </Styled.VideoActions>
        </Styled.VideoMeta>
      </Styled.VideoInfo>
      <Styled.VideoDescription>
        <Styled.VideoChannel>
          <Avatar>
            <Image src={channelThumbnail.url} alt="" layout="fill" />
          </Avatar>
          <Styled.VideoChannelInfo>
            <div>{channel}</div>
            {subscriberCount && (
              <div>{transformSubscribers(subscriberCount)}位訂閱者</div>
            )}
          </Styled.VideoChannelInfo>
          <Button color="secondary">訂閱</Button>
        </Styled.VideoChannel>
        <Styled.VideoCotentDetails showMoreDescription={showMoreDescription}>
          {descriptionLines.map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </Styled.VideoCotentDetails>
        <Styled.ShowMoreDescriptionButton onClick={onShowMoreDescriptionClick}>
          {showMoreDescription ? '只顯示部份資訊' : '顯示完整資訊'}
        </Styled.ShowMoreDescriptionButton>
      </Styled.VideoDescription>
    </>
  );
};

export default Video;
