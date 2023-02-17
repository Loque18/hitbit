import { Rpc } from '../../../types';

import { Observable } from 'rxjs';

interface IProviderStrategy {
    getProvider(rpcs: Rpc[]): unknown;

    requestConnection(provider: unknown): Promise<void>;
    requestDisconnection(provider: any): Promise<void>;
    requestChangeNetwork(provider: any, chainId: number): Promise<void>;

    getPreviosSession(provider: any): Promise<any>;
}

export default IProviderStrategy;
