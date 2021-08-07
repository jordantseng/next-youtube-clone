import styled from 'styled-components';

export const Sidebar = styled.div`
  min-width: ${({ sidebarOpen }) => (sidebarOpen ? '240px' : '72px')};

  & > hr {
    height: 1px;
    border: 0;
    background-color: lightgray;
    margin-top: 10px;
    margin-bottom: 10px;
  }
`;
