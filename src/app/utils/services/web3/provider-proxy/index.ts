import { ProviderContext } from '../provider-context';
import { InjectedProviderStrategy } from '../provider-context/strategies/injected';
import { LinkedProviderStrategy } from '../provider-context/strategies/linked';
import { IProviderStrategy } from '../provider-context/strategies/IProviderStrategy';

// import { validateProviderType } from '../validators';

import { BehaviorSubject, Observable } from 'rxjs';
import { type Rpc, type ProviderType } from '../types';

import { providers } from '../constants';
import { MetaMaskInpageProvider } from '@metamask/providers';
import type EthereumProvider from '@walletconnect/ethereum-provider/dist/types/EthereumProvider';

const StrategiesMap: {
    [key: string]: IProviderStrategy;
} = {
    [providers.INJECTED]: new InjectedProviderStrategy(),
    [providers.LINKED]: new LinkedProviderStrategy(),
};

class ProviderProxy {
    private currentType: ProviderType;
    private context: ProviderContext;

    // observable to subscribe to when the provider is ready
    private onReadySub = new BehaviorSubject<boolean>(false);
    public onReady: Observable<boolean> = this.onReadySub.asObservable();

    private _providers: {
        [key: string]: unknown;
    } = {
        injected: undefined,
        linked: undefined,
    };

    constructor() {
        this.currentType = providers.INJECTED;

        // create a context with the injected strategy as default
        this.context = new ProviderContext(StrategiesMap[this.currentType]);

        // notify the app when the provider is ready
    }

    async init(rpcs: Rpc[]): Promise<void> {
        const injectedStrategy = StrategiesMap[providers.INJECTED];
        const linkedStrategy = StrategiesMap[providers.LINKED];

        // get injected provider
        try {
            this._providers[providers.INJECTED] = await injectedStrategy.getProvider(rpcs);
        } catch (e) {
            console.warn('Injected provider not found');
        }

        // get linked provider
        this._providers[providers.LINKED] = await linkedStrategy.getProvider(rpcs);
    }

    getProvider(type: ProviderType): unknown {
        return this._providers[type];
    }

    // api
    setType(type: ProviderType): void {
        this.currentType = type;
        this.context.setStrategy(StrategiesMap[type]);
    }

    // *~~*~~*~~ Wallet methods ~~*~~*~~* //
    requestConnection(): Promise<unknown> | void {
        return this.context.requestConnection(this._providers[this.currentType]);
    }

    requestDisconnection(): Promise<unknown> | void {
        // prettier-ignore
        this.context.requestDisconnection(this._providers[this.currentType]);
    }

    // getPreviosSession(): Observable<unknown> | void {
    //     return this.context.getPreviosSession(this._providers[this.currentType]);
    // }

    // async requestChangeNetwork(chainId: number): Promise<void> {
    //     // prettier-ignore
    //     await this.context.requestChangeNetwork(this._providers[this.currentType], chainId);
    // }

    getPreviousSession(): Promise<unknown> | void {
        return this.context.getPreviosSession(this._providers[this.currentType]);
    }
}

export { ProviderProxy };
