import Web3 from 'web3';

import { MetaMaskInpageProvider } from '@metamask/providers/dist/MetaMaskInpageProvider';

import { Rpc } from '../../../types';

import { IProviderStrategy } from '../IProviderStrategy';

import { from, switchMap } from 'rxjs';
import { type Observable } from 'rxjs';

class InjectedProviderStrategy implements IProviderStrategy {
    getProvider(): MetaMaskInpageProvider {
        const injected = window.ethereum;

        if (!injected) {
            throw new Error('No injected provider found');
        }

        return injected;
    }

    requestConnection(provider: MetaMaskInpageProvider): Observable<unknown> | void {
        if (provider == null) {
            window.open('https://metamask.io/', '_blank');
            return;
        }

        const observable = from(
            provider.request({
                method: 'eth_requestAccounts',
            })
        );

        return observable;
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    requestDisconnection(): void {}

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async getPreviosSession(provider: any): Promise<unknown> {
        if (provider == null) return;

        const web3 = new Web3(provider);

        const accounts = await web3.eth.getAccounts();

        if (accounts.length === 0) return;

        return provider;
    }

    // async requestChangeNetwork(provider: any, chainId: number): Promise<void> {
    //     await provider.request({
    //         method: 'wallet_switchEthereumChain',
    //         params: [{ chainId: `0x${chainId.toString(16)}` }], // chainId must be in hexadecimal numbers
    //     });
    // }
}

export { InjectedProviderStrategy };
