import styled from 'styled-components';

export const Button = styled.button`
  width: ${({ fullWidth }) => fullWidth && '100%'};
  padding: 9px 15px;
  cursor: pointer;
  color: #fff;
  border: none;
  border-radius: 5px;
  background-color: ${({ color }) => {
    switch (color) {
      case 'primary':
        return '#065fd4';

      case 'secondary':
        return '#c00';

      default:
        return '#e0e0e0';
    }
  }};
`;

export const OutlinedButton = styled(Button)`
  border: ${({ color }) => {
    switch (color) {
      case 'primary':
        return '1px solid #065fd4';

      case 'secondary':
        return '1px solid #c00';

      default:
        return '1px solid #e0e0e0';
    }
  }};
  color: ${({ color }) => {
    switch (color) {
      case 'primary':
        return '#065fd4';

      case 'secondary':
        return '#c00';

      default:
        return '#e0e0e0';
    }
  }};
  background-color: transparent;
`;
