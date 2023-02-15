import { MetaMaskInpageProvider } from '@metamask/providers/dist/MetaMaskInpageProvider';

declare global {
    interface Window {
        ethereum?: MetaMaskInpageProvider;
    }
}

export {};
