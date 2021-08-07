import { useState, useEffect, useRef } from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { useRouter } from 'next/router';

import useWindowDimension from '../hooks/useWindowDimension';

import Header from '../components/shared/Header';
import Sidebar from '../components/shared/Sidebar';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }
`;

const theme = {
  colors: {
    primary: '#0070f3',
  },
};

export default function App({ Component, pageProps }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const searchInputRef = useRef();
  const { width } = useWindowDimension();
  const router = useRouter();

  useEffect(() => {
    if (width && width <= 900 && sidebarOpen) {
      setSidebarOpen(false);
    }
  }, [width]);

  const onSearchClick = (e) => {
    if (!searchInputRef.current.value) {
      return;
    }

    e.preventDefault();
    router.push(`/search?q=${searchInputRef.current.value}`);
  };

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Header
          searchInputRef={searchInputRef}
          setSidebarOpen={setSidebarOpen}
          onSearchClick={onSearchClick}
        />
        <Layout>
          {width > 807 && <Sidebar sidebarOpen={sidebarOpen} />}
          <Component sidebarOpen={sidebarOpen} {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
}

// TODO: try to make it more clean
const Layout = styled.div`
  display: flex;
`;
