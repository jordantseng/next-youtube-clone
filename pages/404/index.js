import Image from 'next/image';
import styled from 'styled-components';

import Searchbox from '../../components/shared/Searchbox';
import Link from '../../components/ui/Link';

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const Content = styled.div`
  margin: auto;
  text-align: center;
  width: 500px;
  padding: 12px;
`;

const LogoLink = styled(Link)`
  display: inline-block;
  margin-right: 8px;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
`;

const NotfoundPage = () => {
  return (
    <Container>
      <Content>
        <Image
          src="/images/monkey.png"
          layout="intrinsic"
          width={180}
          height={180}
        />
        <p>無法瀏覽這個頁面。不便之處，敬請見諒。</p>
        <p>請嘗試搜尋其他內容。</p>
        <Footer>
          <LogoLink href="/">
            <Image
              src="/images/1024px-YouTube_Logo_2017.png"
              alt="youtubeLogo"
              layout="fixed"
              width="90"
              height="20"
            />
          </LogoLink>
          <Searchbox />
        </Footer>
      </Content>
    </Container>
  );
};

export default NotfoundPage;
