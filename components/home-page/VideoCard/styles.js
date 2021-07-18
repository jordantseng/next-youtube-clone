import styled from "styled-components";

export const VideoThumbnail = styled.div`
  position: relative;
`;

export const VideoInfo = styled.div`
  display: flex;
  margin-top: 10px;
`;

export const VideoText = styled.div`
  margin-left: 15px;
  & > h4 {
    width: 100%;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    font-size: 14px;
    margin-bottom: 5px;
  }

  & > p {
    font-size: 14px;
    margin-bottom: 5px;
    color: gray;
  }
`;

export const VideoTimeStamp = styled.div`
  position: absolute;
  background: ${({ isLive }) => (isLive ? "#ff4e45" : "#333333")};
  bottom: 10px;
  right: 10px;
  color: #fff;
  padding: 3px;
`;
