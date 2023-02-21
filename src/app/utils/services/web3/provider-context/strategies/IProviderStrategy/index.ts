import { Rpc } from '../../../types';

import { Observable } from 'rxjs';
import { MetaMaskInpageProvider } from '@metamask/providers';

interface IProviderStrategy {
    getProvider(rpcs: Rpc[]): Observable<unknown> | void;

    requestConnection(provider: unknown): Observable<unknown> | void;
    requestDisconnection(provider: unknown): void;
    getPreviosSession(provider: unknown): Promise<unknown> | void;

    // requestChangeNetwork(provider: any, chainId: number): Promise<void>;
}

export { IProviderStrategy };
