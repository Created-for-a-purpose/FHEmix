import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ethers } from 'ethers';
import { deposit as depositAddress, depositAbi, receiverFhenix, token, erc20Abi, fherc20, fherc20Abi, mixerAbi, mixer } from '../utils/constants';
import { useSDK } from '@metamask/sdk-react-ui';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  max-width: 50rem;
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

const Tab = styled.button`
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
  padding: 4rem;
  border: 1px solid ${(props) => props.theme.colors.border?.default};
  border-radius: 4px;
  background-color: ${(props) => props.theme.colors.background?.default};
`;

const Label = styled.label`
  margin-bottom: 1rem;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 1rem;
  margin-bottom: 2rem;
  border: 1px solid ${(props) => props.theme.colors.border?.default};
  border-radius: 4px;
  font-size: 1.2rem;
`;

const Select = styled.select`
  padding: 1rem;
  margin-bottom: 2rem;
  border: 1px solid ${(props) => props.theme.colors.border?.default};
  border-radius: 4px;
  font-size: 1.2rem;
`;

const SubmitButton = styled.button`
  padding: 1.2rem;
  background-color: ${(props) => props.theme.colors.primary?.default};
  color: ${(props) => props.theme.colors.text?.inverse};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 2rem;
  font-weight: bold;
  margin-top: 1rem;
  &:hover {
    background-color: ${(props) => props.theme.colors.primary?.dark};
  }
`;

const BalanceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
`;

const BalanceText = styled.span`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const RefreshButton = styled.button`
  padding: 0.8rem 1.6rem;
  background-color: ${(props) => props.theme.colors.secondary?.default};
  color: ${(props) => props.theme.colors.text?.inverse};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.2rem;
  &:hover {
    background-color: ${(props) => props.theme.colors.secondary?.dark};
  }
`;

const Mixer = () => {
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit');
  const [depositForm, setDepositForm] = useState({ amount: '', assignee: '' });
  const [withdrawForm, setWithdrawForm] = useState({ amount: '', chain: '' });
  const [balance, setBalance] = useState(0);
  const { chainId } = useSDK();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleDepositChange = (e) => {
    const { name, value } = e.target;
    setDepositForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleWithdrawChange = (e) => {
    const { name, value } = e.target;
    setWithdrawForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const fetchBalance = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    if (chainId == 8008135) {
      const fhecontract = new ethers.Contract(fherc20, fherc20Abi, signer);
      const mixerr = new ethers.Contract(mixer, mixerAbi, signer);
      const balance = await fhecontract.encryptedBalance(await mixerr.peekAddress());
      setBalance(balance.toString());
      return;
    }
    // Fetch the balance from the API or smart contract
    const contract = new ethers.Contract(token, erc20Abi, signer);
    const balance = await contract.balanceOf(signer.getAddress());
    setBalance(balance.toString());
  };

  const deposit = async (e) => {
    e.preventDefault();
    console.log('depositing', depositForm);
    const provider = new ethers.BrowserProvider(window.ethereum);
    if (chainId == 8008135) {
      const mixerr = new ethers.Contract(mixer, mixerAbi, await provider.getSigner());
      let amount = await fetch('http://localhost:3000/encryptAmount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: depositForm.amount }),
      }).then(response => response.arrayBuffer()).then(buffer => new Uint8Array(buffer));
      const address = await fetch('http://localhost:3000/encryptAddress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address: depositForm.assignee }),
      }).then(response => response.arrayBuffer()).then(buffer => new Uint8Array(buffer));
      console.log('amount', amount);
      console.log('address', address);
      const tx = await mixerr.deposit({ data: amount}, { data: address});
      console.log('tx', tx);
      return;
    }
    const depositContract = new ethers.Contract(depositAddress, depositAbi, await provider.getSigner());
    const tx = await depositContract.burnAndMint(depositForm.amount, receiverFhenix, { gasLimit: 1000000 });
    console.log('tx', tx);
    fetchBalance(); // Refresh balance after deposit
  };


  const withdraw = async (e) => {
    e.preventDefault();
    const provider = new ethers.BrowserProvider(window.ethereum);
    const amount = withdrawForm.amount;
    const mixerContract = new ethers.Contract(mixer, mixerAbi, await provider.getSigner());

    fetch('http://localhost:3000/encryptAmount', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: amount }),
  })
  .then(response => response.json())
  .then(data => {
      const encryptedBase64 = data.encrypted;
      const encryptedUint8Array = new Uint8Array(Buffer.from(encryptedBase64, 'base64'));
      console.log('Received Uint8Array:', encryptedUint8Array);
      
      // Now you can use `encryptedUint8Array` as needed
  })
  .catch(error => {
      console.error('Error fetching data:', error);
  });
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
        <BalanceContainer>
          <BalanceText>Balance: {balance} ETH</BalanceText>
          <RefreshButton onClick={fetchBalance}>Refresh Balance</RefreshButton>
        </BalanceContainer>
        {activeTab === 'deposit' && (
          <Form onSubmit={deposit}>
            <Label htmlFor="deposit-amount">Amount</Label>
            <Input
              id="deposit-amount"
              name="amount"
              type="number"
              value={depositForm.amount}
              onChange={handleDepositChange}
              placeholder="Enter amount"
              required
            />
            <Label htmlFor="deposit-assignee">Assignee</Label>
            <Input
              id="deposit-assignee"
              name="assignee"
              type="text"
              value={depositForm.assignee}
              onChange={handleDepositChange}
              placeholder="Enter assignee"
              required
            />
            <SubmitButton type="submit">Deposit</SubmitButton>
          </Form>
        )}
        {activeTab === 'withdraw' && (
          <Form onSubmit={withdraw}>
            <Label htmlFor="withdraw-amount">Amount</Label>
            <Input
              id="withdraw-amount"
              name="amount"
              type="number"
              value={withdrawForm.amount}
              onChange={handleWithdrawChange}
              placeholder="Enter amount"
              required
            />
            <Label htmlFor="withdraw-chain">Chain</Label>
            <Select
              id="withdraw-chain"
              name="chain"
              value={withdrawForm.chain}
              onChange={handleWithdrawChange}
              required
            >
              <option value="">Select chain</option>
              <option value="linea">Linea</option>
              <option value="rootstock">Rootstock</option>
              <option value="fhenix">Fhenix</option>
            </Select>
            <SubmitButton type="submit" onClick={withdraw}>Withdraw</SubmitButton>
          </Form>
        )}
      </InterfaceContainer>
    </Container>
  );
};

export default Mixer;
