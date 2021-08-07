import * as Styled from './styles';

const TextField = ({ placeholder, style, onFocus }) => {
  return (
    <Styled.TextFieldContainer style={style}>
      <input placeholder={placeholder} onFocus={onFocus} />
    </Styled.TextFieldContainer>
  );
};

export default TextField;
