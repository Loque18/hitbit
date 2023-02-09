interface IBonusBattleGame {
    id: number;
    players: number;
    maxPlayers: number;
    rewards: number;
    img: string;
}

const bonusBattleGames: IBonusBattleGame[] = [
    {
        id: 1,
        players: 2,
        maxPlayers: 5,
        rewards: 250,
        img: '/assets/games/wanted.png',
    },
    {
        id: 2,
        players: 2,
        maxPlayers: 4,
        rewards: 450,
        img: '/assets/games/mental.png',
    },
    {
        id: 3,
        players: 1,
        maxPlayers: 5,
        rewards: 500,
        img: '/assets/games/crazytime.png',
    },
    {
        id: 4,
        players: 1,
        maxPlayers: 5,
        rewards: 50,
        img: '/assets/games/xcrash.png',
    },
    {
        id: 5,
        players: 4,
        maxPlayers: 5,
        rewards: 100,
        img: '/assets/games/olympus.png',
    },
];

export { bonusBattleGames, IBonusBattleGame };
