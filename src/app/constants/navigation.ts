type INavLink = {
    label: string;
    url: string;
    icon: string;
    active: string;
};

const NAV_LINKS: INavLink[] = [
    {
        label: 'All Games',
        url: '/home',
        icon: '/assets/icons/category.svg',
        active: 'home',
    },
    {
        label: 'Dice',
        url: '/games/dice',
        icon: '/assets/icons/dice.svg',
        active: 'dice',
    },
    {
        label: 'Slots',
        url: '/games/slots',
        icon: '/assets/icons/apple-arcade.svg',
        active: 'slots',
    },
    {
        label: 'Roulette',
        url: '/games/roulette',
        icon: '/assets/icons/poker-chip.svg',
        active: 'roulette',
    },
    {
        label: 'Blackjack',
        url: '/games/blackjack',
        icon: '/assets/icons/cards.svg',
        active: 'blackjack',
    },
    {
        label: 'Towers',
        url: '/games/towers',
        icon: '/assets/icons/tower.svg',
        active: 'towers',
    },
    {
        label: 'Mines',
        url: '/games/mines',
        icon: '/assets/icons/bomb.svg',
        active: 'mines',
    },
    {
        label: 'Lottery',
        url: '/games/lottery',
        icon: '/assets/icons/ticket.svg',
        active: 'lottery',
    },
    {
        label: 'JackPot',
        url: '/games/jackpot',
        icon: '/assets/icons/cherry.svg',
        active: 'jackpot',
    },
    {
        label: 'News',
        url: '/games/news',
        icon: '/assets/icons/news.svg',
        active: 'news',
    },
];

export { NAV_LINKS, INavLink };
