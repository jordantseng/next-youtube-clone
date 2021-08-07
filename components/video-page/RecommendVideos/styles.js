import styled from 'styled-components';

export const VideoCardContainer = styled.div`
  display: flex;
  width: 100%;
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
