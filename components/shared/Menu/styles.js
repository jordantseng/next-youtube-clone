import styled from 'styled-components';

export const MenuContainer = styled.div`
  z-index: 100;
  position: fixed;
  right: 30px;
  top: 60px;
  width: 300px;
  background-color: rgba(255, 255, 255, 0.98);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-top: none;
`;

export const MenuHeader = styled.div`
  display: flex;
  padding: 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

export const MenuItems = styled.div`
  padding: 16px 0;
`;

export const MenuItem = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  cursor: pointer;
  padding: 0 16px;

  &:hover {
    background-color: lightgray;
  }
`;
