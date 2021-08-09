import styled from 'styled-components';

export const VideoPageContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  padding: 40px 20px 20px 20px;
  background-color: #f9f9f9;
  margin-left: ${({ sidebarOpen }) => {
    if (sidebarOpen === null) {
      return '0px';
    }
    return sidebarOpen ? '240px' : '72px';
  }};

  @media only screen and (max-width: 1187px) {
    margin-left: 0;
  }
`;

export const VideoContainer = styled.div`
  flex: 1;
  padding-right: 16px;

  @media only screen and (max-width: 1000px) {
    padding: 0;
  }
`;

export const RecommendVideosContainer = styled.div`
  width: 330px;

  @media only screen and (max-width: 1000px) {
    width: 100%;
    padding-top: 16px;
  }
`;
