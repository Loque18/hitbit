type INavLink = {
    label: string;
    url: string;
    icon: string;
};

const NAV_LINKS: INavLink[] = [
    {
        label: 'All Games',
        url: '/home',
        icon: '/assets/icons/category.svg',
    },
    {
        label: 'Dice',
        url: '/games/dice',
        icon: '/assets/icons/dice.svg',
    },
    {
        label: 'Slots',
        url: '/games/slots',
        icon: '/assets/icons/apple-arcade.svg',
    },
    {
        label: 'Roulette',
        url: '/games/roulette',
        icon: '/assets/icons/poker-chip.svg',
    },
    {
        label: 'Blackjack',
        url: '/games/blackjack',
        icon: '/assets/icons/cards.svg',
    },
    {
        label: 'Towers',
        url: '/games/towers',
        icon: '/assets/icons/tower.svg',
    },
    {
        label: 'Mines',
        url: '/games/mines',
        icon: '/assets/icons/bomb.svg',
    },
    {
        label: 'Lottery',
        url: '/games/lottery',
        icon: '/assets/icons/ticket.svg',
    },
    {
        label: 'JackPot',
        url: '/games/jackpot',
        icon: '/assets/icons/cherry.svg',
    },
    {
        label: 'News',
        url: '/games/news',
        icon: '/assets/icons/news.svg',
    },
];

export { NAV_LINKS, INavLink };
