import type { OnRpcRequestHandler, OnUserInputHandler } from '@metamask/snaps-sdk';
import { UserInputEventType } from '@metamask/snaps-sdk';
import { panel, text, button, form, input, spinner } from '@metamask/snaps-sdk';
import { ethers } from 'ethers';

export const onRpcRequest: OnRpcRequestHandler = async ({
  origin,
  request,
}) => {
  switch (request.method) {
    case 'hello':
      const walletInterface = await snap.request({
        method: 'snap_createInterface',
        params: {
          ui: panel([
            text(`Hello!`),
            text('Create a smart, recoverable wallet now'),
            form('create_wallet_form', [
              input({
                name: 'Domain', label: 'Domain'
              }),
              input({
                name: 'Password', label: 'Password', inputType: 'password'
              }),
              button({ value: 'Create', buttonType: 'submit', name: 'create_wallet' }),
            ]),
          ]),
        }
      });
      return snap.request({
        method: 'snap_dialog',
        params: {
          type: 'confirmation',
          id: walletInterface,
        },
      });
    default:
      throw new Error('Method not found.');
  }
};

export const onUserInput: OnUserInputHandler = async ({
  id,
  event,
}) => {
  if (event.type === UserInputEventType.FormSubmitEvent) {
    switch (event.name) {
      case 'create_wallet_form':
        await snap.request({
          method: 'snap_updateInterface',
          params: {
            id,
            ui: panel([
              text(`Creating wallet...`),
              spinner(),
            ])
          },
        });
        await createWallet(event.value.Domain, event.value.Password);
        break;
    }
  }
}

const createWallet = async (domain: any, password: any) => {
} 