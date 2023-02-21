import { ProviderContext } from '../provider-context';
import { InjectedProviderStrategy } from '../provider-context/strategies/injected';
import { LinkedProviderStrategy } from '../provider-context/strategies/linked';
import { IProviderStrategy } from '../provider-context/strategies/IProviderStrategy';

// import { validateProviderType } from '../validators';

import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { type Rpc, type ProviderType } from '../types';

import { providers } from '../constants';

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

    constructor(rpcs: Rpc[]) {
        this.currentType = providers.INJECTED;

        // create a context with the injected strategy as default
        this.context = new ProviderContext(StrategiesMap[this.currentType]);

        // get all type of providers
        Object.values(providers).forEach((providerType: string, idx: number) => {
            // instantiate strategies
            // this.context.setStrategy(StrategiesMap[providerType]());

            const strategy: IProviderStrategy = StrategiesMap[providerType];

            try {
                const providerObs = strategy.getProvider(rpcs);

                if (providerObs) {
                    providerObs.subscribe(provider => {
                        this._providers[providerType] = provider;

                        if (idx === Object.values(providers).length - 1) {
                            // notify the app when the provider is read

                            this.onReadySub.next(true);
                        }
                    });
                }

                // instantiate providers
            } catch (e) {
                // handle error
                console.warn(`Provider of type ${providerType} not found`);
            }
        });

        // notify the app when the provider is ready
    }

    getProvider(type: ProviderType): unknown | void {
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
