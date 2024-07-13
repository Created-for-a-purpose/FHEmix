import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Center the content vertically */
  flex: 1;
  margin-bottom: 7.6rem;
  width: 100%;
  ${({ theme }) => theme.mediaQueries.small} {
    padding-left: 2.4rem;
    padding-right: 2.4rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
`;

const Heading = styled.h1`
  margin-top: 0;
  margin-bottom: 2rem;
  text-align: center;
`;

const Span = styled.span`
  color: ${(props) => props.theme.colors.primary?.default};
`;

const InterfaceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 6rem;
  width: 100%;
  max-width: 50rem; /* Increase max-width for a larger form */
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

const Tab = styled.button<{ isActive: boolean }>`
  background-color: ${(props) => (props.isActive ? props.theme.colors.primary?.default : 'transparent')};
  color: ${(props) => (props.isActive ? props.theme.colors.text?.inverse : props.theme.colors.text?.default)};
  padding: 1rem 2rem;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  border-radius: ${(props) => (props.isActive ? props.theme.radii.button : 0)};
  &:not(:last-child) {
    margin-right: 1rem;
  }
  &:hover {
    background-color: ${(props) => !props.isActive && props.theme.colors.background?.alternative};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 4rem; /* Increase padding for a more spacious form */
  border: 1px solid ${(props) => props.theme.colors.border?.default};
  border-radius: 4px; /* Make the borders less curved */
  background-color: ${(props) => props.theme.colors.background?.default};
`;

const Label = styled.label`
  margin-bottom: 1rem; /* Increase margin for better spacing */
  font-weight: bold;
`;

const Input = styled.input`
  padding: 1rem; /* Increase padding for taller fields */
  margin-bottom: 2rem; /* Increase margin for better spacing */
  border: 1px solid ${(props) => props.theme.colors.border?.default};
  border-radius: 4px; /* Make the borders less curved */
  font-size: 1.2rem;
`;

const Select = styled.select`
  padding: 1rem; /* Increase padding for taller fields */
  margin-bottom: 2rem; /* Increase margin for better spacing */
  border: 1px solid ${(props) => props.theme.colors.border?.default};
  border-radius: 4px; /* Make the borders less curved */
  font-size: 1.2rem;
`;

const SubmitButton = styled.button`
  padding: 1.2rem; /* Increase padding for a larger button */
  background-color: ${(props) => props.theme.colors.primary?.default};
  color: ${(props) => props.theme.colors.text?.inverse};
  border: none;
  border-radius: 4px; /* Make the borders less curved */
  cursor: pointer;
  font-size:2rem; /* Increase font size for better readability */
  font-weight: bold;
  margin-top: 1rem;
  &:hover {
    background-color: ${(props) => props.theme.colors.primary?.dark};
  }
`;

const Mixer = () => {
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit');

  const handleTabClick = (tab: 'deposit' | 'withdraw') => {
    setActiveTab(tab);
  };

  return (
    <Container>
      <Heading>
        Mixer
      </Heading>
      <InterfaceContainer>
        <TabContainer>
          <Tab isActive={activeTab === 'deposit'} onClick={() => handleTabClick('deposit')}>
            Deposit
          </Tab>
          <Tab isActive={activeTab === 'withdraw'} onClick={() => handleTabClick('withdraw')}>
            Withdraw
          </Tab>
        </TabContainer>
        {activeTab === 'deposit' && (
          <Form>
            <Label htmlFor="deposit-amount">Amount</Label>
            <Input id="deposit-amount" type="number" placeholder="Enter amount" required />
            <Label htmlFor="deposit-assignee">Assignee</Label>
            <Input id="deposit-assignee" type="text" placeholder="Enter assignee" required />
            <SubmitButton type="submit">Deposit</SubmitButton>
          </Form>
        )}
        {activeTab === 'withdraw' && (
          <Form>
            <Label htmlFor="withdraw-amount">Amount</Label>
            <Input id="withdraw-amount" type="number" placeholder="Enter amount" required />
            <Label htmlFor="withdraw-chain">Chain</Label>
            <Select id="withdraw-chain" required>
              <option value="">Select chain</option>
              <option value="linea">Linea</option>
              <option value="rootstock">Rootstock</option>
              <option value="fhenix">Fhenix</option>
            </Select>
            <SubmitButton type="submit">Withdraw</SubmitButton>
          </Form>
        )}
      </InterfaceContainer>
    </Container>
  );
};

export default Mixer;
