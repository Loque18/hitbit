interface IGame {
    id: number;
    name: string;
    icon: string;
}

const games: IGame[] = [
    {
        id: 1,
        name: 'Roulette',
        icon: '/assets/games/roulette.png',
    },
    {
        id: 2,
        name: 'Towers',
        icon: '/assets/games/towers.png',
    },
    {
        id: 3,
        name: 'Dice',
        icon: '/assets/games/dice.png',
    },
    {
        id: 4,
        name: 'Slots',
        icon: '/assets/games/slots.png',
    },
    {
        id: 5,
        name: 'Blackjack',
        icon: '/assets/games/blackjack.png',
    },
];

export { IGame, games };
