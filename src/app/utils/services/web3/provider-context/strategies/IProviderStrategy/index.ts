import { Rpc } from '../../../types';

import type EthereumProvider from '@walletconnect/ethereum-provider/dist/types/EthereumProvider';
import { MetaMaskInpageProvider } from '@metamask/providers';

interface IProviderStrategy {
    getProvider(rpcs: Rpc[]): Promise<EthereumProvider> | MetaMaskInpageProvider | void;

    requestConnection(provider: unknown): Promise<unknown> | void;
    requestDisconnection(provider: unknown): Promise<unknown> | void;
    getPreviosSession(provider: unknown): Promise<unknown> | void;

    // requestChangeNetwork(provider: any, chainId: number): Promise<void>;
}

export { IProviderStrategy };
