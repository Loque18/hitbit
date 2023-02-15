import { MetaMaskInpageProvider } from '@metamask/providers';
import Web3 from 'web3';

import IProviderStrategy from '../IProviderStrategy';

class InjectedProviderStrategy implements IProviderStrategy {
    getProvider(): unknown {
        const eth_provider = window.ethereum;

        if (!eth_provider) {
            throw new Error('No injected provider found');
        }

        return eth_provider;
    }

    requestConnection(provider: MetaMaskInpageProvider): void {
        if (provider == null) {
            window.open('https://metamask.io/', '_blank');
            return;
        }

        provider.request({
            method: 'eth_requestAccounts',
        });
    }

    // async requestDisconnection(provider: any): Promise<void> {}

    // async requestChangeNetwork(provider: any, chainId: number): Promise<void> {
    //     await provider.request({
    //         method: 'wallet_switchEthereumChain',
    //         params: [{ chainId: `0x${chainId.toString(16)}` }], // chainId must be in hexadecimal numbers
    //     });
    // }

    // async getPreviosSession(provider: any): Promise<any> {
    //     if (provider == null) return null;

    //     const web3 = new Web3(provider);

    //     const accounts = await web3.eth.getAccounts();

    //     if (accounts.length === 0) return null;

    //     return provider;
    // }
}

export default InjectedProviderStrategy;
