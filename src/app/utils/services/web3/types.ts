type Rpc = {
    name: string;
    chainId: number;
    url: string;
};

type Web3Config = {
    rpcs: {
        [rpcName: string]: Rpc;
    };
};

export { Rpc, Web3Config };
