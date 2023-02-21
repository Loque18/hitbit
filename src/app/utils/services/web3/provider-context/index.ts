import { IProviderStrategy } from './strategies/IProviderStrategy';
import { Rpc } from '../types';

import { type Observable } from 'rxjs';
import { MetaMaskInpageProvider } from '@metamask/providers';

class ProviderContext {
    private _strategy: IProviderStrategy;

    constructor(strategy: IProviderStrategy) {
        this._strategy = strategy;
    }

    public setStrategy(strategy: IProviderStrategy): void {
        this._strategy = strategy;
    }

    // set strategy(strategy: IProviderStrategy) {
    //     this._strategy = strategy;
    // }

    getProvider(rpcs: Rpc[]): Observable<unknown> | void {
        return this._strategy.getProvider(rpcs);
    }

    // *~~*~~*~~ Wallet methods *~~*~~*~~* //
    requestConnection(provider: unknown): Observable<unknown> | void {
        return this._strategy.requestConnection(provider);
    }

    requestDisconnection(provider: unknown): void {
        return this._strategy.requestDisconnection(provider);
    }

    getPreviosSession(provider: unknown): Promise<unknown> | void {
        return this._strategy.getPreviosSession(provider);
    }

    // async requestChangeNetwork(provider: any, chainId: number): Promise<void> {
    //     return this._strategy.requestChangeNetwork(provider, chainId);
    // }

    // async getPreviosSession(provider: any): Promise<any> {
    //     return this._strategy.getPreviosSession(provider);
    // }
}

export { ProviderContext };
