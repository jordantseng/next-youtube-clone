import styled from 'styled-components';

export const Sidebar = styled.div`
  flex: ${({ sidebarOpen }) => (sidebarOpen ? 0.2 : 0.05)};

  & > hr {
    height: 1px;
    border: 0;
    background-color: lightgray;
    margin-top: 10px;
    margin-bottom: 10px;
  }
`;
