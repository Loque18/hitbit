/* eslint-disable @typescript-eslint/no-explicit-any */

import type EthereumProviderT from '@walletconnect/ethereum-provider/dist/types/EthereumProvider';
import { EthereumProvider } from '@walletconnect/ethereum-provider';

import { IProviderStrategy } from '../IProviderStrategy';

import { Rpc } from '../../../types';
import { environment } from 'src/environments/environment';

// eslint-disable-next-line @typescript-eslint/no-var-requires
// const { EthereumProvider } = require('@walletconnect/ethereum-provider');

class LinkedProviderStrategy implements IProviderStrategy {
    getProvider(rpcs: Rpc[]): Promise<EthereumProviderT> {
        // const rpcObject = {};

        return EthereumProvider.init({
            projectId: environment.wcProjectId,
            chains: [1, 97],
        });
    }

    requestConnection(provider: EthereumProviderT): Promise<unknown> {
        return provider.enable();
    }

    requestDisconnection(provider: EthereumProviderT): Promise<void> {
        return provider.disconnect();
    }

    // async requestChangeNetwork(provider: any, chainId: number): Promise<void> {
    //     console.warn(`Please change to network ${chainId}`);
    // }

    getPreviosSession(provider: EthereumProviderT): Promise<unknown> | void {
        if (provider.accounts.length === 0) return;

        // return provider;
        return provider.enable();
    }
}

export { LinkedProviderStrategy };
