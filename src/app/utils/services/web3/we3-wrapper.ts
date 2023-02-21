import Web3 from 'web3';

class Web3Wrapper {
    constructor(
        public web3Instance: Web3 | undefined = undefined,
        public initialized: boolean = false // public readOnlyInitialized: boolean = false
    ) {}

    public setWeb3Instance(web3Instance: Web3): void {
        this.web3Instance = web3Instance;
        this.initialized = true;
    }

    public removeWeb3Instance(): void {
        this.web3Instance = undefined;
        this.initialized = false;
    }

    // public setReadOnlyInitialized(web3): void {
}

export { Web3Wrapper };
