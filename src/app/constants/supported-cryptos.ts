type CryptoCurrency = {
    name: string;
    symbol: string;
    decimals: number;
    iconUrl: string;
};

const CRYPTOS: CryptoCurrency[] = [
    {
        symbol: 'ETH',
        decimals: 18,
        name: 'Ethereum',
        iconUrl: '',
    },
    {
        symbol: 'BNB',
        decimals: 18,
        name: 'Binance Coin',
        iconUrl: '',
    },
    {
        symbol: 'MATIC',
        decimals: 18,
        name: 'Polygon',
        iconUrl: '',
    },
];

export { CRYPTOS, CryptoCurrency };
