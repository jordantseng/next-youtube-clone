import styled from 'styled-components';

export const SearchPageContainer = styled.div`
  flex: 1;
  display: flex;
  background: #f9f9f9;
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

export const VideoCards = styled.div`
  padding: 24px 16px;
`;
