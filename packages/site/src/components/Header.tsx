import styled, { useTheme } from 'styled-components';
import { useState } from 'react';
import { useSDK } from "@metamask/sdk-react";
import { getThemePreference } from '../utils';
import { SnapLogo } from './SnapLogo';
import { Toggle } from './Toggle';
import { MetaMaskButton } from "@metamask/sdk-react-ui";
import { useNavigate } from 'react-router-dom';
import { HeaderButtons } from './Buttons';

const HeaderWrapper = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 2.4rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.border?.default};
`;

const Title = styled.p`
  font-size: ${(props) => props.theme.fontSizes.title};
  font-weight: bold;
  margin: 0;
  margin-left: 1.2rem;
  cursor: pointer; /* Set cursor to pointer on hover */
  &:hover {
    text-decoration: underline; /* Optional: underline text on hover */
  }
  ${({ theme }) => theme.mediaQueries.small} {
    display: none;
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Header = ({
  handleToggleClick,
}: {
  handleToggleClick(): void;
}) => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <HeaderWrapper>
      <LogoWrapper>
        <SnapLogo color={theme.colors.icon?.default} size={36} />
        <Title onClick={() => navigate('/')}>FHEmix</Title> {/* Updated title */}
      </LogoWrapper>
      <RightContainer>
        <Toggle
          onToggle={handleToggleClick}
          defaultChecked={getThemePreference()}
        />
        <MetaMaskButton theme={"light"} color="white" />
      </RightContainer>
    </HeaderWrapper>
  );
};
