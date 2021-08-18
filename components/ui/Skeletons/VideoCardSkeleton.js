import SkeletonsElement from './SkeletonsElement';

import * as Styled from './styles';

const VideoCardSkeleton = () => {
  return (
    <Styled.VideoCardSkeletonContainer>
      <SkeletonsElement type="thumbnail" />
      <div style={{ display: 'flex' }}>
        <div>
          <SkeletonsElement type="avatar" />
        </div>
        <div style={{ width: '100%', marginLeft: 8 }}>
          <SkeletonsElement type="text" />
          <SkeletonsElement type="text" width="80%" />
        </div>
      </div>
    </Styled.VideoCardSkeletonContainer>
  );
};

export default VideoCardSkeleton;
