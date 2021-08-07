import styled from 'styled-components';

export const CommentCardContainer = styled.div`
  display: flex;
  margin: 16px 0 16px 0;
`;

export const CommentText = styled.div`
  margin-left: 16px;
`;

export const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;

  & div {
    margin-right: 8px;
  }
`;

export const VideoAction = styled.div`
  color: #717171;
  font-weight: 500;
  display: flex;
  align-items: center;
  padding: 8px;
  & p {
    margin-left: 8px;
  }
`;

export const VideoActions = styled.div`
  display: flex;
`;
