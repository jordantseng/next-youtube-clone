import * as Styled from './styles';

const SkeletonsElement = ({ type, width, height }) => {
  return (
    <Styled.SkeletonsElementContainer
      type={type}
      width={width}
      height={height}
    ></Styled.SkeletonsElementContainer>
  );
};

export default SkeletonsElement;
