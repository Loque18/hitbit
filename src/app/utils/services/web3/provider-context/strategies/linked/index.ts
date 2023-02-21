// import type EthereumProviderT from '@walletconnect/ethereum-provider/dist/types/EthereumProvider';
// import { EthereumProvider } from '@walletconnect/ethereum-provider';

import { IProviderStrategy } from '../IProviderStrategy';

import { Rpc } from '../../../types';
import { environment } from 'src/environments/environment';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { EthereumProvider } = require('@walletconnect/ethereum-provider');

class LinkedProviderStrategy implements IProviderStrategy {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    protected provider!: any;

    async init(rpcs: Rpc[]): Promise<void> {
        try {
            this.provider = await EthereumProvider.init({
                projectId: environment.wcProjectId,
                chains: [1, 56],
            });
        } catch (e) {
            console.log(e);
        }
    }

    getProvider(): unknown | undefined {
        return this.provider;
    }

    requestConnection(): Promise<unknown> {
        return this.provider?.enable();
    }

    requestDisconnection(): Promise<void> {
        return this.provider?.disconnect();
    }

    getPreviosSession(): Promise<string[]> | string[] {
        if (this.provider?.accounts.length === 0) return [];

        // return provider;
        return this.provider.enable();
    }
}

export { LinkedProviderStrategy };
