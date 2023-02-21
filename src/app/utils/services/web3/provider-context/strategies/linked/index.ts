/* eslint-disable @typescript-eslint/no-explicit-any */
import { IProviderStrategy } from '../IProviderStrategy';

import { Rpc } from '../../../types';
import { from, Observable } from 'rxjs';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { EthereumProvider } = require('@walletconnect/ethereum-provider');

class LinkedProviderStrategy implements IProviderStrategy {
    getProvider(rpcs: Rpc[]): Observable<unknown> {
        // const rpcObject = {};

        const obs = from(
            EthereumProvider.init({
                projectId: '2dca332c410c1ef9156430369d7459a9',
                chains: [1],
            })
        );

        return obs;
    }

    requestConnection(provider: any): Observable<unknown> | void {
        const obs = from(provider.enable());
        return obs;
    }

    async requestDisconnection(provider: any): Promise<void> {
        await provider.disconnect();
    }

    // async requestChangeNetwork(provider: any, chainId: number): Promise<void> {
    //     console.warn(`Please change to network ${chainId}`);
    // }

    getPreviosSession(provider: any): Promise<unknown> | void {
        // if (!provider.connector.connected) return null;
        // await provider.enable();

        // return provider;
        return;
    }
}

export { LinkedProviderStrategy };
