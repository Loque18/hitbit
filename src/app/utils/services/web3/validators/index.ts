import { providers } from '../constants';
import { Web3Config } from '../types';

// function validateProviderType(providerType: string) {
//     if (!providerType)
//         throw new Error('celeste JS: providerType must be specified');
//     if (!providers[providerType])
//         throw new Error(
//             `celeste JS: providerType ${providerType} is not supported`
//         );
// }

function validateConfig(config: Web3Config) {
    const { rpcs } = config;

    // if (isMultichain === null || isMultichain === undefined)
    //     throw new Error('celeste JS: isMultichain must be specified');

    // prettier-ignore
    if(!rpcs) throw new Error('celeste JS: rpcs must be specified in celeste.config.js');

    if (Object.keys(rpcs).length === 0) throw new Error('celeste JS: config rpcs must contain at least one element');
}

// function validateIfLoggedIn() {
//     const { isLoggedIn } = celesteStore.getState().walletReducer;

//     if (isLoggedIn) return true;

//     return false;
// }

// function validateChainId(chainId: number) {
//     if (typeof chainId !== 'number' || chainId < 0)
//         throw new Error('celeste JS: chainId must be a number greater than 0');
// }

export { validateConfig };
