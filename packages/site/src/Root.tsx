import { BrowserRouter as Router, Route } from 'react-router-dom';
import type { FunctionComponent, ReactNode } from 'react';
import { createContext, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { dark, light } from './config/theme';
import { MetaMaskUIProvider } from "@metamask/sdk-react-ui";
import { getThemePreference, setLocalStorage } from './utils';

export type RootProps = {
  children: ReactNode;
};

type ToggleTheme = () => void;

export const ToggleThemeContext = createContext<ToggleTheme>(
  (): void => undefined,
);

export const Root: FunctionComponent<RootProps> = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState(getThemePreference());

  const toggleTheme: ToggleTheme = () => {
    setLocalStorage('theme', darkTheme ? 'light' : 'dark');
    setDarkTheme(!darkTheme);
  };

  return (
    <MetaMaskUIProvider sdkOptions={{
      dappMetadata: {
        name: 'My Dapp',
        url: window.location.href,
      },
      infuraAPIKey: '2764e348a0d948a3b5ae126db084c18e'
    }}>
      <ToggleThemeContext.Provider value={toggleTheme}>
        <ThemeProvider theme={darkTheme ? dark : light}>
          <Router>
            {children}
          </Router>
        </ThemeProvider>
      </ToggleThemeContext.Provider>
    </MetaMaskUIProvider>
  );
};