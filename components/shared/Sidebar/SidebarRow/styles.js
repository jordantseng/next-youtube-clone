import styled from 'styled-components';
import Link from '../../../ui/Link';

export const LogoLink = styled(Link)`
  text-decoration: none;
  color: #000;
`;

export const SidebarRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ sidebarOpen }) =>
    sidebarOpen ? '16px 8px 16px 20px' : '16px 0'};
  background-color: ${({ selected }) => selected && 'lightgray'};
  flex-direction: ${({ sidebarOpen }) => (sidebarOpen ? 'row' : 'column')};
  cursor: pointer;

  sidebarOpen & > svg {
    color: ${({ selected }) => (selected ? 'red' : '#606060')};
    font-size: large;
  }

  & > span {
    flex: 1;
    margin-left: ${({ sidebarOpen }) => sidebarOpen && '20px'};
    text-align: ${({ sidebarOpen }) => !sidebarOpen && 'center'};
    font-size: 12px;
  }

  &:hover {
    background-color: lightgray;

    svg {
      color: red;
    }

    h2 {
      font-weight: bold;
    }
  }
`;
