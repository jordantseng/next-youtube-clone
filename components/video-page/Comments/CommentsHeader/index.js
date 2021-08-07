import Avatar from '@material-ui/core/Avatar';

import CommentForm from '../CommentForm';

import * as Styled from './styles';

const CommentsHeader = () => {
  return (
    <Styled.VideoCommentsHeader>
      {/* TODO: from current observation, need to send a lot api requests */}
      {/* <Styled.VideoCommentCount>3,058 則留言</Styled.VideoCommentCount> */}
      <Styled.VideoCommentSection>
        <Avatar />
        <Styled.CommentFormContainer>
          <CommentForm />
        </Styled.CommentFormContainer>
      </Styled.VideoCommentSection>
    </Styled.VideoCommentsHeader>
  );
};

export default CommentsHeader;
