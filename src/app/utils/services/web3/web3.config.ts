import { Web3Config } from './types';

const config: Web3Config = {
    rpcs: {
        eth: {
            url: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
            chainId: 5,
            name: 'Ethereum',
        },
        bsc: {
            url: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
            chainId: 97,
            name: 'BSC',
        },
        polygon: {
            url: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
            chainId: 56,
            name: 'Polygon',
        },
    },
};

export { config };
