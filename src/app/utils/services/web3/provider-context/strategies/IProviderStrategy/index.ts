import { Rpc } from '../../../types';

import { Observable } from 'rxjs';

interface IProviderStrategy {
    getProvider(rpcs: Rpc[]): unknown;

    requestConnection(provider: unknown): Observable<unknown> | void;
    requestDisconnection(provider: unknown): void;
    getPreviosSession(provider: unknown): Promise<unknown> | void;

    // requestChangeNetwork(provider: any, chainId: number): Promise<void>;
}

export { IProviderStrategy };
