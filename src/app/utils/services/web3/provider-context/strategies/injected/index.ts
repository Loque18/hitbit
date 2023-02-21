import { MetaMaskInpageProvider } from '@metamask/providers/dist/MetaMaskInpageProvider';

import { IProviderStrategy } from '../IProviderStrategy';

class InjectedProviderStrategy implements IProviderStrategy {
    getProvider(): MetaMaskInpageProvider | void {
        const injected = window.ethereum;

        if (!injected) {
            throw new Error('No injected provider found');
        }

        return injected;
    }

    requestConnection(provider: MetaMaskInpageProvider): Promise<unknown> | void {
        if (provider == null) {
            window.open('https://metamask.io/', '_blank');
            return;
        }

        return provider.request({ method: 'eth_requestAccounts' });
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    requestDisconnection(): void {}

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async getPreviosSession(provider: MetaMaskInpageProvider): Promise<unknown> {
        if (provider == null) return;

        const accounts = (await provider.request({ method: 'eth_accounts' })) as string[];

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
