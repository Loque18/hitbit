type Rpc = {
    name: string;
    chainId: number;
    url: string;
};

type Web3Config = {
    rpcs: {
        // at least one
        [rpcName: string]: Rpc;
    };
};

type ProviderType = 'injected' | 'linked';

export { Rpc, Web3Config, ProviderType };
