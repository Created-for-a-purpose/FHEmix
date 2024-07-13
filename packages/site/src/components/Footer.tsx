import styled, { useTheme } from 'styled-components';

import { ReactComponent as MetaMaskFox } from '../assets/metamask_fox.svg';
import { MetaMask } from './MetaMask';
import { PoweredBy } from './PoweredBy';
import { Fhenix } from './Fhenix';
import { Hyperlane } from './Hyperlane';

const FooterWrapper = styled.footer`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-top: 2.4rem;
  padding-bottom: 2.4rem;
  border-top: 1px solid ${(props) => props.theme.colors.border?.default};
`;

const PoweredByButton = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 1.2rem;
  margin-right: 1rem; /* Add margin-right for space between buttons */
  border-radius: ${({ theme }) => theme.radii.button};
  box-shadow: ${({ theme }) => theme.shadows.button};
  background-color: ${({ theme }) => theme.colors.background?.alternative};
  text-decoration: none; /* Ensure no default underline for anchor tag */
`;

const PoweredByContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
`;

export const Footer = () => {
  const theme = useTheme();

  return (
    <FooterWrapper>
      <PoweredByButton href="https://www.fhenix.io/" target="_blank">
        <Fhenix color={theme.colors.text?.default} />
      </PoweredByButton>
      <PoweredByButton href="https://docs.metamask.io/" target="_blank">
        <MetaMaskFox />
        <PoweredByContainer>
          <PoweredBy color={theme.colors.text?.muted} />
          <MetaMask color={theme.colors.text?.default} />
        </PoweredByContainer>
      </PoweredByButton>
      <PoweredByButton href="https://www.hyperlane.co/" target="_blank">
        <Hyperlane color={theme.colors.text?.default} />
      </PoweredByButton>
    </FooterWrapper>
  );
};
