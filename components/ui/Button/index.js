import * as Styled from './styles';

const Button = ({ style, color, fullWidth, variant, children, onClick }) => {
  switch (variant) {
    case 'outlined':
      return (
        <Styled.OutlinedButton
          style={style}
          color={color}
          fullWidth={fullWidth}
        >
          {children}
        </Styled.OutlinedButton>
      );
    default:
      break;
  }

  return (
    <Styled.Button
      style={style}
      color={color}
      fullWidth={fullWidth}
      onClick={onClick}
    >
      {children}
    </Styled.Button>
  );
};

export default Button;
