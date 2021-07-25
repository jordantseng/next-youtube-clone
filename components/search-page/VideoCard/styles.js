import styled from "styled-components";

export const VideoCard = styled.div`
  display: flex;
  margin-bottom: 16px;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

export const VideoThumbnail = styled.div`
  position: relative;
  flex: 1;
  max-width: 360px;
  min-width: 240px;
  margin-right: 16px;

  @media only screen and (max-width: 600px) {
    max-width: 100%;
    margin: 0;
  }
`;

export const VideoInfo = styled.div`
  flex: 1;

  & > h4 {
    width: 100%;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: 18px;
    margin-bottom: 5px;
  }

  & > p {
    margin-bottom: 5px;
  }
`;

export const VideoChannel = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;

  & > p {
    font-size: 14px;
    margin-left: 5px;
    color: gray;
  }
`;

export const VideoDescription = styled.div`
  width: 100%;
  font-size: 16px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-break: anywhere;
`;

export const VideoTimeStamp = styled.div`
  position: absolute;
  background: #333333;
  bottom: 10px;
  right: 10px;
  color: #fff;
  padding: 3px;
`;
