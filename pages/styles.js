import styled from 'styled-components';

export const HomePageContainer = styled.div`
  flex: 1;
  background-color: #f9f9f9;
`;

export const VideoCards = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  padding: 24px 16px;
`;
