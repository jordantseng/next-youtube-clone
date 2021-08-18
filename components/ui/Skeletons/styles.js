import styled, { css } from 'styled-components';

const textSkeleton = css`
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '16px'};
`;

const titleSkeleton = css`
  width: 50%;
  height: 20px;
  margin-bottom: 15px;
`;

const avatarSkeleton = css`
  width: ${({ width }) => width || '48px'};
  height: ${({ height }) => height || '48px'};
  border-radius: 50%;
`;

const thumbnailSkeleton = css`
  width: 100%;
  height: 230px;
`;

export const SkeletonsElementContainer = styled.div`
  background-color: #ddd;
  margin: 10px 0;
  border-radius: 4px;

  ${({ type }) => {
    if (type === 'text') {
      return textSkeleton;
    }

    if (type === 'title') {
      return titleSkeleton;
    }

    if (type === 'avatar') {
      return avatarSkeleton;
    }

    if (type === 'thumbnail') {
      return thumbnailSkeleton;
    }
  }}
`;

export const VideoCardSkeletonContainer = styled.div``;
