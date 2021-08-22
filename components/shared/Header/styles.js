import styled from 'styled-components';
import Link from '../../ui/Link';

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  position: sticky;
  top: 0;
  z-index: 998;
  background-color: #fff;
`;

export const LeftHeader = styled.div`
  display: flex;
  align-items: center;

  & > svg {
    cursor: pointer;
  }
`;

export const SearchboxContainer = styled.div`
  width: 40%;

  @media only screen and (max-width: 600px) {
    display: none;
  }
`;

export const LogoLink = styled(Link)`
  display: inline-block;
  margin-left: 20px;
  height: 20px;
`;

export const RightHeader = styled.div`
  display: flex;
  align-items: center;
`;

export const IconLink = styled(Link)`
  color: black;
  margin-right: 8px;
  display: flex;
  svg {
    cursor: pointer;
    font-size: 30px;
  }
`;
