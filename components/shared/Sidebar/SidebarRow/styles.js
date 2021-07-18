import styled from 'styled-components';

export const SidebarRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  background-color: ${({ selected }) => selected && 'lightgray'};
  flex-direction: ${({ sidebarOpen }) => (sidebarOpen ? 'row' : 'column')};

  sidebarOpen & > svg {
    color: ${({ selected }) => (selected ? 'red' : '#606060')};
    font-size: large;
  }

  & > h2 {
    flex: 1;
    margin-left: ${({ sidebarOpen }) => (sidebarOpen ? '20px' : 0)};
    width: ${({ sidebarOpen }) => (sidebarOpen ? '120px' : '60px')};
    text-align: ${({ sidebarOpen }) => !sidebarOpen && 'center'};
    font-size: 12px;
    font-weight: ${({ selected }) => (selected ? 'bold' : '500')};
  }

  &:hover {
    background-color: lightgray;
    cursor: pointer;

    svg {
      color: red;
    }

    h2 {
      font-weight: bold;
    }
  }
`;
