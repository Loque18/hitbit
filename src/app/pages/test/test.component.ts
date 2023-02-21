import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Web3Service } from 'src/app/utils/services/web3/web3.service';

import { WalletData } from 'src/app/utils/services/web3/wallet-data';

@Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
    protected wData: WalletData = new WalletData();

    constructor(protected web3Service: Web3Service, private cd: ChangeDetectorRef) {}

    metamaskConnect(): void {
        this.web3Service.requestConnection('injected');
    }

    wcConnect(): void {
        this.web3Service.requestConnection('linked');
    }

    disconnect(): void {
        this.web3Service.requestDisconnection();
    }

    signMessage(): void {
        this.web3Service.signMessage('test');
    }

    ngOnInit(): void {
        this.web3Service.walletData$.subscribe((data: WalletData) => {
            this.wData = data;

            this.cd.detectChanges();
        });
    }
}
