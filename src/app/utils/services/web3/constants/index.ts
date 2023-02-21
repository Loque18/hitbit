import { ProviderType } from '../types';

const providers: {
    INJECTED: ProviderType;
    LINKED: ProviderType;
} = {
    INJECTED: 'injected',
    LINKED: 'linked',
};

const events = {
    ACCOUNTS_CHANGED: 'accountsChanged',
    CHAIN_CHANGED: 'chainChanged',
    DISCONNECT: 'disconnect',
};

export { providers, events };
