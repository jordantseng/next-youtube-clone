import NoResultsSvg from './NoResultsSvg';

import * as Styled from './styles';

const NoResults = () => {
  return (
    <Styled.Container style={{ width: '90%', maxWidth: 450 }}>
      <Styled.SvgContainer>
        <NoResultsSvg />
      </Styled.SvgContainer>
      <Styled.TextContainer>
        <h3>找不到結果</h3>
        <h4>請改用其他關鍵字</h4>
      </Styled.TextContainer>
    </Styled.Container>
  );
};

export default NoResults;
