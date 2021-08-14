import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';

import Header from '../components/shared/Header';
import Sidebar from '../components/shared/Sidebar';

import { UserProvider } from '../contexts/userContext';

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

const Layout = styled.div`
  display: flex;
`;

export default function App({ Component, pageProps }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const searchInputRef = useRef();
  const router = useRouter();

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
        <UserProvider>
          <Header
            searchInputRef={searchInputRef}
            setSidebarOpen={setSidebarOpen}
            onSearchClick={onSearchClick}
          />
          <Layout>
            <Sidebar sidebarOpen={sidebarOpen} />
            <Component sidebarOpen={sidebarOpen} {...pageProps} />
          </Layout>
        </UserProvider>
      </ThemeProvider>
    </>
  );
}
