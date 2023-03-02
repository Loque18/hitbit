type RouletteCoin = {
    id: number;
    color: string;
    value: number;
    img: string;
};

const bronze_url = '/assets/games/roulette/bronze-coin.png';
const silver_url = '/assets/games/roulette/silver-coin.png';
const gold_url = '/assets/games/roulette/gold-coin.png';

const ROULETTE_COINS: RouletteCoin[] = [
    { id: 1, color: 'bronze', value: 1, img: bronze_url },
    { id: 2, color: 'silver', value: 2, img: silver_url },
    { id: 3, color: 'bronze', value: 1, img: bronze_url },
    { id: 4, color: 'silver', value: 2, img: silver_url },
    { id: 5, color: 'bronze', value: 1, img: bronze_url },
    { id: 6, color: 'silver', value: 2, img: silver_url },
    { id: 7, color: 'bronze', value: 1, img: bronze_url },
    { id: 8, color: 'silver', value: 2, img: silver_url },
    { id: 9, color: 'bronze', value: 1, img: bronze_url },
    { id: 10, color: 'silver', value: 2, img: silver_url },
    { id: 11, color: 'bronze', value: 1, img: bronze_url },
    { id: 12, color: 'silver', value: 2, img: silver_url },
    { id: 13, color: 'bronze', value: 1, img: bronze_url },
    { id: 14, color: 'silver', value: 2, img: silver_url },
    { id: 15, color: 'gold', value: 3, img: gold_url },
];

export { RouletteCoin, ROULETTE_COINS };
