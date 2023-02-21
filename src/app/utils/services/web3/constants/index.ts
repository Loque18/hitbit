import { ProviderType } from '../types';

const providers: {
    INJECTED: ProviderType;
} = {
    INJECTED: 'injected',
    // CONNECTED: 'CONNECTED',
};

const events = {
    ACCOUNTS_CHANGED: 'accountsChanged',
    CHAIN_CHANGED: 'chainChanged',
    DISCONNECT: 'disconnect',
};

export { providers, events };
