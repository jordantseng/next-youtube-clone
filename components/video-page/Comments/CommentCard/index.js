import Image from 'next/image';

import Avatar from '@material-ui/core/Avatar';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

import * as Styled from './styles';

import { transformTimeStamp } from '../../../../utils';

const CommentCard = ({
  authorImage,
  authorName,
  publishedAt,
  content,
  likeCount,
  canReply,
  setLastComment,
}) => {
  return (
    <Styled.CommentCardContainer ref={setLastComment}>
      <Avatar>
        <Image src={authorImage} alt="" layout="fill" />
      </Avatar>
      <Styled.CommentText>
        <Styled.CommentHeader>
          <div>{authorName}</div>
          <div>{transformTimeStamp(publishedAt)}</div>
        </Styled.CommentHeader>
        <div dangerouslySetInnerHTML={{ __html: content }} />
        <Styled.VideoActions>
          <Styled.VideoAction>
            <ThumbUpIcon />
            {+likeCount > 0 && <p>{likeCount}</p>}
          </Styled.VideoAction>
          <Styled.VideoAction>
            <ThumbDownIcon />
          </Styled.VideoAction>
          {canReply && <Styled.VideoAction>回覆</Styled.VideoAction>}
        </Styled.VideoActions>
      </Styled.CommentText>
    </Styled.CommentCardContainer>
  );
};

export default CommentCard;
