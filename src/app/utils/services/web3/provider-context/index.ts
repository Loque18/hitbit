import { IProviderStrategy } from './strategies/IProviderStrategy';
import { Rpc } from '../types';

// import type EthereumProvider from '@walletconnect/ethereum-provider/dist/types/EthereumProvider';
import { MetaMaskInpageProvider } from '@metamask/providers';

class ProviderContext {
    private _strategy: IProviderStrategy;

    constructor(strategy: IProviderStrategy) {
        this._strategy = strategy;
    }

    public setStrategy(strategy: IProviderStrategy): void {
        this._strategy = strategy;
    }

    // *~~*~~*~~ interface methods *~~*~~*~~* //

    getProvider(): MetaMaskInpageProvider | unknown | undefined {
        return this._strategy.getProvider();
    }

    requestConnection(): Promise<unknown> | void {
        return this._strategy.requestConnection();
    }

    requestDisconnection(): Promise<unknown> | void {
        return this._strategy.requestDisconnection();
    }

    getPreviosSession(): Promise<string[]> | string[] {
        return this._strategy.getPreviosSession();
    }
}

export { ProviderContext };
