import { Rpc } from '../../../types';

// import type EthereumProvider from '@walletconnect/ethereum-provider/dist/types/EthereumProvider';
import { MetaMaskInpageProvider } from '@metamask/providers';

interface IProviderStrategy {
    // provider: MetaMaskInpageProvider | EthereumProvider | undefined;

    init(rpcs: Rpc[]): Promise<void> | void;

    getProvider(): MetaMaskInpageProvider | unknown | undefined;

    requestConnection(): Promise<unknown> | void;
    requestDisconnection(): Promise<unknown> | void;
    getPreviosSession(): Promise<string[]> | string[];

    // requestChangeNetwork(provider: any, chainId: number): Promise<void>;
}

export { IProviderStrategy };
