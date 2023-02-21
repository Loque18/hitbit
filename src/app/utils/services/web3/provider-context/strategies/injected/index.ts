import { MetaMaskInpageProvider } from '@metamask/providers/dist/MetaMaskInpageProvider';

import { IProviderStrategy } from '../IProviderStrategy';

class InjectedProviderStrategy implements IProviderStrategy {
    protected provider!: MetaMaskInpageProvider;

    init(): void {
        const injected = window.ethereum;

        if (!injected) {
            throw new Error('No injected provider found');
        }

        this.provider = injected;
    }

    getProvider(): MetaMaskInpageProvider | undefined {
        return this.provider;
    }

    requestConnection(): Promise<unknown> | void {
        if (!this.provider) {
            window.open('https://metamask.io/', '_blank');
            return;
        }

        return this.provider.request({ method: 'eth_requestAccounts' });
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    requestDisconnection(): void {}

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getPreviosSession(): Promise<string[]> | string[] {
        if (!this.provider) return [];

        return this.provider.request({ method: 'eth_accounts' }) as Promise<string[]>;

        // const accounts = (await this.provider.request({ method: 'eth_accounts' })) as string[];

        // if (accounts.length === 0) return;

        // return accounts;
    }
}

export { InjectedProviderStrategy };
