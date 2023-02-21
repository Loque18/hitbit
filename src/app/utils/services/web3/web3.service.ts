import { Injectable } from '@angular/core';
import { BehaviorSubject, from, map, Observable, switchMap } from 'rxjs';
import Web3 from 'web3';

import { ProviderProxy } from './provider-proxy';

import { Rpc, Web3Config, ProviderType } from './types';

import { config } from './web3.config';

import { WalletData } from './wallet-data';

import { providers } from './constants';
import { MetaMaskInpageProvider } from '@metamask/providers';

@Injectable({
    providedIn: 'root',
})
export class Web3Service {
    private _web3: Web3 | null = null;

    private _walletData: WalletData = new WalletData();

    private _walletDataSubject: BehaviorSubject<WalletData> = new BehaviorSubject<WalletData>(this._walletData);
    public walletData$: Observable<WalletData> = this._walletDataSubject.asObservable();

    private _providerProxy!: ProviderProxy;

    constructor() {
        this._initWeb3(config);

        this.walletData$.subscribe(data => {
            this._walletData = data;
        });
    }

    private _initWeb3(config: Web3Config): void {
        // 2. create readonly web3 for each rpc instance
        // const { rpcs } = config;
        // Object.values(rpcs).forEach((rpc: Rpc) => {
        //     const web3 = new Web3(rpc.url);
        // });

        // instantiate provider proxy
        this._providerProxy = new ProviderProxy(Object.values(config.rpcs));

        // lister for wallet events
        this._listenForProviderEvents();

        // try to get previous session
        this.getPreviousSession();
    }

    private async getPreviousSession(): Promise<void> {
        // const listOfProviders = [providers.INJECTED];

        type _Session = {
            providerType: ProviderType;
            provider: unknown | undefined;
        };

        // injected
        this._providerProxy.setType(providers.INJECTED);
        const injectedSession: _Session = {
            providerType: providers.INJECTED,
            provider: await this._providerProxy.getPreviousSession(),
        };

        // const injectedSession = {
        //     providerType: providers.INJECTED,
        //     provider: this._providerProxy.getPreviosSession().s
        // };

        // const sessions = await Promise.all(
        //     listOfProviders.map(async providerType => {
        //         this.providerProxy.setType(providerType);
        //         const provider = await this.providerProxy.getPreviousSession();

        //         return {
        //             providerType,
        //             provider,
        //         };
        //     })
        // );

        const s = [injectedSession].find(s => s.provider !== undefined);

        if (s) {
            this.storeWalletData(s.providerType, s.provider);
        }
    }

    // *~~*~~*~~ Wallet Methods ~~*~~*~~* //

    public requestConnection(providerType: ProviderType): Observable<unknown> | void {
        if (this._walletData.isLoggedIn) return; // if user is already logged in, do nothing

        this._providerProxy.setType(providerType);

        const connectionObservable: Observable<unknown> | void = this._providerProxy.requestConnection();

        if (connectionObservable) {
            connectionObservable.subscribe(() => {
                this.storeWalletData(providerType, this._providerProxy.getProvider(providerType));
            });
        }

        return connectionObservable;

        // await storeWalletData(providerType, this.providerProxy.getProvider(providerType), this.config);
    }

    public requestDisconnection() {
        if (!this._walletData.isLoggedIn) return; // if user is not logged in, do nothing

        const providerType = this._walletData.provider as ProviderType;

        this._providerProxy.setType(providerType);

        this._providerProxy.requestDisconnection();

        this.removeWalletData();

        // this.storeWalletData(WalletData.EmptyWallet());
    }

    // *~~*~~*~~ Web3 Events ~~*~~*~~* //

    private _listenForProviderEvents(): void {
        const injectedProvider: MetaMaskInpageProvider = this._providerProxy.getProvider(
            providers.INJECTED
        ) as MetaMaskInpageProvider;

        if (injectedProvider) {
            injectedProvider.removeAllListeners();

            injectedProvider.on('accountsChanged', accounts => {
                const acc: string[] = accounts as string[];

                this.accountsChanged(acc);
            });

            injectedProvider.on('chainChanged', chainId => {
                const chainId_decimal = parseInt(chainId as string, 16);

                this.chainChanged(chainId_decimal);
            });

            injectedProvider.on('disconnect', () => {
                // this.disconnect();
            });
        }
    }

    accountsChanged(accounts: string[]): void {
        if (!(accounts.length > 0)) {
            this.removeWalletData();
        } else {
            if (!this._walletData.isLoggedIn) return;

            this._walletData.setAddress(accounts[0]);
            this._walletDataSubject.next(this._walletData);
            // celesteStore.dispatch(set_address(accounts[0]));
        }
    }

    chainChanged(chainId: number): void {
        if (!this._walletData.isLoggedIn) return;

        this._walletData.setChainId(chainId);
        this._walletDataSubject.next(this._walletData);
    }

    // *~~*~~*~~ Utility Methods ~~*~~*~~* //

    // public storeWalletData(walletData: WalletData): void {
    //     this._walletDataSubject.next(walletData);
    // }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private async storeWalletData(providerType: ProviderType, provider: any): Promise<void> {
        const _web3: Web3 = new Web3(provider);
        const chainId: number = await _web3.eth.getChainId();
        const addresses: string[] = await _web3.eth.getAccounts();
        const address: string = addresses[0];
        const loggedIn: boolean = true;

        const walletData: WalletData = new WalletData(address, chainId, providerType, loggedIn);

        this._walletDataSubject.next(walletData);
    }

    private removeWalletData(): void {
        this._walletData.reset();
        this._walletDataSubject.next(this._walletData);
    }
}
