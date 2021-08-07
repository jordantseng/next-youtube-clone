import styled from 'styled-components';

export const VideoPlayer = styled.div`
  position: relative;
  aspect-ratio: 16 / 9;

  & iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

export const VideoInfo = styled.div`
  padding: 20px 0 8px 0;
  width: 100%;
  border-bottom: 1px solid lightgray;

  & h3 {
    margin-bottom: 8px;
  }
`;

export const VideoMeta = styled.div`
  margin-bottom: 8px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const VideoActions = styled.div`
  display: flex;
`;

export const VideoDetails = styled.div`
  display: flex;
  align-items: center;
`;

export const VideoAction = styled.div`
  color: #717171;
  font-weight: 500;
  display: flex;
  align-items: center;
  padding: 8px 8px 8px 0;
  & p {
    margin-left: 8px;
  }
`;

export const VideoDescription = styled.div`
  padding: 20px 0 8px 0;
  width: 100%;
  border-bottom: 1px solid lightgray;
`;

export const VideoChannel = styled.div`
  display: flex;
  margin-bottom: 8px;
`;

export const VideoChannelInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  margin-left: 16px;
`;

export const VideoCotentDetails = styled.div`
  height: ${({ showMoreDescription }) =>
    showMoreDescription ? '100%' : '69px'};
  overflow: ${({ showMoreDescription }) => !showMoreDescription && 'hidden'};
  margin-left: 56px;

  word-break: break-all;

  // margin-right: 48px;
`;

export const ShowMoreDescriptionButton = styled.div`
  margin-left: 56px;
  cursor: pointer;
  color: #717171;
  margin-top: 8px;
  font-size: 14px;
  font-weight: 500;
`;
