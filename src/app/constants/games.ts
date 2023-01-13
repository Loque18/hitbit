interface IGame {
    id: number;
    name: string;
    icon: string;
}

const games: IGame[] = [
    {
        id: 1,
        name: 'Roulette',
        icon: 'https://picsum.photos/200/200',
    },
    {
        id: 2,
        name: 'Towers',
        icon: 'https://picsum.photos/200/200',
    },
    {
        id: 3,
        name: 'Dice',
        icon: 'https://picsum.photos/200/200',
    },
    {
        id: 4,
        name: 'Slots',
        icon: 'https://picsum.photos/200/200',
    },
    {
        id: 5,
        name: 'Blackjack',
        icon: 'https://picsum.photos/200/200',
    },
    {
        id: 6,
        name: 'Poker',
        icon: 'https://picsum.photos/200/200',
    },
];

export { IGame, games };
