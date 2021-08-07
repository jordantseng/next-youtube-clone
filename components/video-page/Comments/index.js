import { useEffect } from 'react';

import useFetchComments from '../../../hooks/api/useFetchComments';
import useOnScreen from '../../../hooks/useOnScreen';

import CommentsHeader from './CommentsHeader';
import CommentCard from './CommentCard';
import Loader from '../../ui/Loader';

const Comments = ({ videoId }) => {
  const { loading, comments, error, hasMore, setPageNumber } =
    useFetchComments(videoId);
  const [visible, setLastComment] = useOnScreen();

  useEffect(() => {
    if (visible && hasMore) {
      setPageNumber((pageNumber) => pageNumber + 1);
    }
  }, [visible, hasMore]);

  return (
    <>
      <CommentsHeader />
      {comments.map((comment, index) => {
        const lastComment = comments.length === index + 1;
        const { topLevelComment, canReply } = comment.snippet;

        if (lastComment) {
          return (
            <CommentCard
              key={comment.id}
              authorImage={topLevelComment.snippet.authorProfileImageUrl}
              authorName={topLevelComment.snippet.authorDisplayName}
              publishedAt={topLevelComment.snippet.publishedAt}
              content={topLevelComment.snippet.textDisplay}
              likeCount={topLevelComment.snippet.likeCount}
              canReply={canReply}
              setLastComment={setLastComment}
            />
          );
        }
        return (
          <CommentCard
            key={comment.id}
            authorImage={topLevelComment.snippet.authorProfileImageUrl}
            authorName={topLevelComment.snippet.authorDisplayName}
            publishedAt={topLevelComment.snippet.publishedAt}
            content={topLevelComment.snippet.textDisplay}
            likeCount={topLevelComment.snippet.likeCount}
            canReply={canReply}
          />
        );
      })}
      {loading && <Loader />}
    </>
  );
};

export default Comments;
