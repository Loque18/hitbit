import { type ProviderType } from './types';

class WalletData {
    constructor(
        public address: string | null = null,
        public chainId: number | null = null,
        public provider: ProviderType | null = null,
        public isLoggedIn: boolean = false
    ) {}

    static EmptyWallet(): WalletData {
        return new WalletData();
    }

    public reset(): void {
        this.address = null;
        this.chainId = null;
        this.provider = null;
        this.isLoggedIn = false;
    }

    public setAddress(address: string): void {
        this.address = address;
    }

    public setChainId(chainId: number): void {
        this.chainId = chainId;
    }

    public setProvider(provider: ProviderType): void {
        this.provider = provider;
    }

    public setIsLoggedIn(isLoggedIn: boolean): void {
        this.isLoggedIn = isLoggedIn;
    }

    // public clone(): WalletData {
    //     return new WalletData(this.address, this.chainId, this.provider, this.isLoggedIn);
    // }
}

export { WalletData };
