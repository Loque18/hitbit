import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Web3Service } from 'src/app/utils/services/web3/web3.service';

import { WalletData } from 'src/app/utils/services/web3/wallet-data';
import { finalize } from 'rxjs';

import elliptic from 'elliptic';

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

    test2(): void {
        // Generate ECDSA key pair
        const ec = new elliptic.ec('secp256k1');

        // gen key pair
        const keyPair = ec.genKeyPair();

        // Get the corresponding public key
        const publicKey = keyPair.getPublic();

        // Get the public key as a number (x-coordinate only)
        const publicKeyX = keyPair.getPublic().getX().toString();

        const publicKeyY = keyPair.getPublic().getY().toString();

        // Get the corresponding private key
        const privateKey = keyPair.getPrivate();

        // Data to be signed
        const message = 'Hello, world!';

        // Create a signature
        const signature = keyPair.sign(message);

        // Verify the signature
        const verified = keyPair.verify(message, signature);

        const res = {
            privateKey: privateKey.toString(16),
            publicKey: publicKey.encode('hex', false),
            publicKeyX,
            publicKeyY,
            message,
            signature: signature.toDER('hex'),
            verified,
        };

        console.log(res);

        navigator.clipboard.writeText(JSON.stringify(res, null, 4));
    }

    test3(): void {
        // Generate ECDSA key pair
        const ec = new elliptic.ec('secp256k1');
        const keyPair = ec.genKeyPair();

        // Get the corresponding public key
        const publicKey = keyPair.getPublic();

        // Get the corresponding private key
        const privateKey = keyPair.getPrivate();

        // Print the private and public keys
        console.log('Private key: ', privateKey.toString(16));
        console.log('Public key: ', publicKey.encode('hex', false));

        // Data to be signed
        const message = 'Hello, world!';

        // Create a signature
        const signature = keyPair.sign(message);

        console.log('Signature: ', signature.toDER('hex'));

        // Verify the signature
        const verified = keyPair.verify(message, signature);

        console.log('Signature verified: ', verified);
    }
}
