import styled from 'styled-components';
import Link from '../../../ui/Link';

export const VideoCardContainer = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 16px;
`;

export const VideoThumbnail = styled(Link)`
  position: relative;
  height: 94px;
  width: 168px;
  margin-right: 8px;
`;

export const VideoInfo = styled.div`
  flex: 1;
  cursor: pointer;
`;

export const VideoTitle = styled.h3`
  font-weight: bolder;
  width: 100%;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 14px;
  margin-bottom: 5px;
`;

export const VideoChannelTitle = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 12px;
  color: #606060;
`;

export const VideoStatistics = styled.div`
  display: flex;
  font-size: 12px;
  color: #606060;
`;

export const VideoTimeStamp = styled.div`
  position: absolute;
  background: #333333;
  bottom: 10px;
  right: 10px;
  color: #fff;
  padding: 3px;
`;
