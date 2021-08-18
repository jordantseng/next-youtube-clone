import { useState } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

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

export default function App({ Component, pageProps }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <UserProvider>
          <Component
            setSidebarOpen={setSidebarOpen}
            sidebarOpen={sidebarOpen}
            {...pageProps}
          />
        </UserProvider>
      </ThemeProvider>
    </>
  );
}
