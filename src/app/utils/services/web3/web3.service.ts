/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { BehaviorSubject, from, map, Observable, switchMap } from 'rxjs';
import Web3 from 'web3';

import { ProviderProxy } from './provider-proxy';

import { Rpc, Web3Config, ProviderType } from './types';

import { config } from './web3.config';

import { WalletData } from './wallet-data';
import { Web3Wrapper } from './we3-wrapper';

import { providers } from './constants';
import { MetaMaskInpageProvider } from '@metamask/providers';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class Web3Service {
    private _web3Wrapper: Web3Wrapper = new Web3Wrapper();
    private _walletData: WalletData = new WalletData();

    private _walletDataSubject: BehaviorSubject<WalletData> = new BehaviorSubject<WalletData>(this._walletData);
    public walletData$: Observable<WalletData> = this._walletDataSubject.asObservable();

    private _web3WrapperSub: BehaviorSubject<Web3Wrapper> = new BehaviorSubject<Web3Wrapper>(this._web3Wrapper);
    public web3Wrapper$: Observable<Web3Wrapper> = this._web3WrapperSub.asObservable();

    private _providerProxy!: ProviderProxy;

    constructor() {
        this._initWeb3(config);
    }

    private _initWeb3(config: Web3Config): void {
        // 2. create readonly web3 for each rpc instance
        // const { rpcs } = config;
        // Object.values(rpcs).forEach((rpc: Rpc) => {
        //     const web3 = new Web3(rpc.url);
        // });

        // instantiate provider proxy
        this._providerProxy = new ProviderProxy();

        this._providerProxy.init(Object.values(config.rpcs));

        this._providerProxy.onReady.subscribe((ready: boolean) => {
            if (ready) {
                // listen for provider events
                this._listenForProviderEvents();

                // try to get previous session
                this.getPreviousSession();
            }
        });
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

        // connected
        this._providerProxy.setType(providers.LINKED);
        const linkedSession: _Session = {
            providerType: providers.LINKED,
            provider: await this._providerProxy.getPreviousSession(),
        };

        const s = [injectedSession, linkedSession].find(s => s.provider !== undefined);

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

    public signMessage(message: string): Observable<unknown> | void {
        if (!this._walletData.isLoggedIn) return;

        const type = this._walletData.provider as ProviderType;

        const provider = this._providerProxy.getProvider(type) as any;

        if (!provider) return;

        const obs = from(provider.request({ method: 'personal_sign', params: [message, this._walletData.address] }));

        return obs;
    }

    // *~~*~~*~~ Web3 Events ~~*~~*~~* //

    private _listenForProviderEvents(): void {
        const injectedProvider: MetaMaskInpageProvider = this._providerProxy.getProvider(
            providers.INJECTED
        ) as MetaMaskInpageProvider;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const wcProvider: any = this._providerProxy.getProvider(providers.LINKED);

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

        if (wcProvider) {
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            wcProvider.removeListener('accountsChanged', () => {});
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            wcProvider.removeListener('chainChanged', () => {});
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            wcProvider.removeListener('disconnect', () => {});

            wcProvider.on('accountsChanged', (acc: string[]) => {
                this.accountsChanged(acc);
            });

            wcProvider.on('chainChanged', (chainId: number) => {
                this.chainChanged(chainId);
                // this.events.chainChanged && this.events.chainChanged(chainId);
            });

            wcProvider.on('disconnect', (stream: any) => {
                const { code, message } = stream;

                if (code === 6000) {
                    this.accountsChanged([]);
                } else {
                    // eslint-disable-next-line no-console
                    if (!environment.production) console.error('Wallet disconnected', code, message);

                    this.accountsChanged([]);
                }

                // this.events.disconnect && this.events.disconnect(code, reason);
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

        this._walletData = walletData;
        this._walletDataSubject.next(walletData);

        this._web3Wrapper.setWeb3Instance(_web3);
        this._web3Subject.next(this._web3Wrapper);
    }

    private removeWalletData(): void {
        this._walletData.reset();
        this._walletDataSubject.next(this._walletData);

        this._web3Wrapper.removeWeb3Instance();
        this._web3WrapperSub.next(this._web3Wrapper);
    }
}
