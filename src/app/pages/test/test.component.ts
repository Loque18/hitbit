import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Web3Service } from 'src/app/utils/services/web3/web3.service';

import { WalletData } from 'src/app/utils/services/web3/wallet-data';
import { finalize } from 'rxjs';

@Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.scss'],
})
export class TestComponent {
    protected mmLoading = false;

    constructor(protected web3Service: Web3Service) {}

    metamaskConnect(): void {
        this.mmLoading = true;
        const obs = this.web3Service.requestConnection('injected');

        obs.subscribe({
            next: data => {
                this.mmLoading = false;
            },
            error: err => {
                this.mmLoading = false;
            },
        });
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
}
