interface ILiveCasinoGame {
    id: number;
    img: string;
}

const liveCasinoGames: ILiveCasinoGame[] = [
    {
        id: 1,
        img: '/assets/games/crazytime.png',
    },
    {
        id: 2,
        img: '/assets/games/mental.png',
    },
    {
        id: 3,
        img: '/assets/games/olympus.png',
    },
    {
        id: 4,
        img: '/assets/games/wanted.png',
    },
    {
        id: 5,
        img: '/assets/games/xcrash.png',
    },
];

export { liveCasinoGames, ILiveCasinoGame };
