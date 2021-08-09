import styled from 'styled-components';

export const Sidebar = styled.div`
  position: fixed;
  top: 72px;
  height: 100vh;
  min-width: ${({ sidebarOpen }) => (sidebarOpen ? '240px' : '72px')};

  & > hr {
    height: 1px;
    border: 0;
    background-color: lightgray;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  @media only screen and (max-width: 1187px) {
    display: none;
  }
`;
