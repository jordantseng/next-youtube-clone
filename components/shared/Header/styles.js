import styled from "styled-components";
import StyledLink from "../StyledLink";

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

export const LogoLink = styled(StyledLink)`
  display: inline-block;
  margin-left: 20px;
  height: 20px;
`;

export const RightHeader = styled.div`
  display: flex;
  align-items: center;
`;

export const IconLink = styled(StyledLink)`
  color: black;
  margin-right: 8px;
  display: flex;
  svg {
    cursor: pointer;
    font-size: 30px;
  }
`;
