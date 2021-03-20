import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from './styles/global';

import { useTheme } from './hooks/theme';

import AppProvider from './hooks';

import Routes from './routes';

const App: React.FC = () => {
  const { theme } = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppProvider>
          <Routes />
        </AppProvider>
        <GlobalStyle />
      </Router>
    </ThemeProvider>
  );
};

export default App;
