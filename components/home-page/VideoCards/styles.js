import styled from "styled-components";

export const VideosCardContainer = styled.div`
  flex: 1;
  background-color: #f9f9f9;
  padding: 40px 20px 20px 20px;

  & > h2 {
    margin: 0 5px 20px 5px;
  }
`;

export const VideoCards = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
`;
