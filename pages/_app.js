import { useState, useEffect, useRef } from "react";
import useWindowDimenstion from "../hooks/useWindowDimenstion";
import useSearchVideos from "../hooks/useSearchVideos";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";

import Header from "../components/shared/Header";
import Sidebar from "../components/shared/Sidebar";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }
`;

const theme = {
  colors: {
    primary: "#0070f3",
  },
};

export default function App({ Component, pageProps }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [videos, searchVideos] = useSearchVideos("");
  const { width } = useWindowDimenstion();
  const searchInputRef = useRef();

  useEffect(() => {
    if (width && width <= 900 && sidebarOpen) {
      setSidebarOpen(false);
    }
  }, [width]);

  const onSearchClick = (e) => {
    e.preventDefault();
    searchVideos(searchInputRef.current.value);
  };

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Header
          searchInputRef={searchInputRef}
          onSearchClick={onSearchClick}
          setSidebarOpen={setSidebarOpen}
        />
        <Layout>
          <Sidebar sidebarOpen={sidebarOpen} />
          <Component
            sidebarOpen={sidebarOpen}
            searchedVideos={videos}
            {...pageProps}
          />
        </Layout>
      </ThemeProvider>
    </>
  );
}

// TODO: try to make it more clean
const Layout = styled.div`
  display: flex;
`;
