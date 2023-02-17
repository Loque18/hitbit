import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import Web3 from 'web3';

import { Rpc, Web3Config } from './types';

class WalletData {
    constructor(
        public _address: string | null = null,
        public chainId: number | null = null,
        public provider: string = ''
    ) {}
}

@Injectable({
    providedIn: 'root',
})
export class Web3Service {
    private _web3: Web3 | null = null;

    private _walletData: WalletData = new WalletData();

    private _walletDataSubject: BehaviorSubject<WalletData> = new BehaviorSubject<WalletData>(this._walletData);
    public walletData$: Observable<WalletData> = this._walletDataSubject.asObservable();

    // constructor() {}

    private _initWeb3(config: Web3Config): void {
        // 2. create readonly web3 for each rpc instance

        const { rpcs } = config;

        Object.values(rpcs).forEach((rpc: Rpc) => {
            const web3 = new Web3(rpc.url);
        });
    }

    // wallet connection
}
