import type { FunctionComponent, ReactNode } from 'react';
import { useContext } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Footer, Header } from './components';
import { GlobalStyle } from './config/theme';
import { ToggleThemeContext } from './Root';
import Index from './pages/index'; // Assuming your Index component is in pages folder
import Mixer from './pages/Mixer'; // Create a new Mixer component

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  max-width: 100vw;
`;

export type AppProps = {
  children: ReactNode;
};

export const App: FunctionComponent<AppProps> = ({ children }) => {
  const toggleTheme = useContext(ToggleThemeContext);

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <Header handleToggleClick={toggleTheme} />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/mixer" element={<Mixer />} />
        </Routes>
        <Footer />
      </Wrapper>
    </>
  );
};