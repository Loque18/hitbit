import { ProviderContext } from '../provider-context';
import { InjectedProviderStrategy } from '../provider-context/strategies/injected';
// import LinkedProviderStrategy from '../provider-context/strategies/linked';
import { IProviderStrategy } from '../provider-context/strategies/IProviderStrategy';

// import { validateProviderType } from '../validators';

import { type Observable } from 'rxjs';
import { type Rpc, type ProviderType } from '../types';

import { providers } from '../constants';

const StrategiesMap: {
    [key: string]: IProviderStrategy;
} = {
    [providers.INJECTED]: new InjectedProviderStrategy(),
    // [providers.CONNECTED]: new LinkedProviderStrategy(),
};

class ProviderProxy {
    private currentType: ProviderType;
    private context: ProviderContext;

    private _providers: {
        [key: string]: unknown;
    } = {
        injected: undefined,
        connected: undefined,
    };

    constructor(rpcs: Rpc[]) {
        this.currentType = providers.INJECTED;

        // create a context with the injected strategy as default
        this.context = new ProviderContext(StrategiesMap[this.currentType]);

        // get all type of providers
        Object.values(providers).forEach((providerType: string) => {
            // instantiate strategies
            // this.context.setStrategy(StrategiesMap[providerType]());

            const strategy: IProviderStrategy = StrategiesMap[providerType];

            try {
                // instantiate providers
                this._providers[providerType] = strategy.getProvider(rpcs);
            } catch (e) {
                // handle error
                console.warn(`Provider of type ${providerType} not found`);
            }
        });
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
    requestConnection(): Observable<unknown> | void {
        return this.context.requestConnection(this._providers[this.currentType]);
    }

    requestDisconnection(): void {
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

    async getPreviousSession(): Promise<unknown> {
        const connection = await this.context.getPreviosSession(this._providers[this.currentType]);
        return connection;
    }
}

export { ProviderProxy };
