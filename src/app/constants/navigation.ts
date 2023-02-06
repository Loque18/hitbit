interface INavLink {
    label: string;
    url: string;
    icon: string;
}

const NAV_LINKS: INavLink[] = [
    {
        label: 'All Games',
        url: '/home',
        icon: '/assets/icons/category.svg',
    },
    {
        label: 'Dice',
        url: '/dice',
        icon: '/assets/icons/dice.svg',
    },
    {
        label: 'Slots',
        url: '/slots',
        icon: '/assets/icons/apple-arcade.svg',
    },
    {
        label: 'Roulette',
        url: '/roulette',
        icon: '/assets/icons/poker-chip.svg',
    },
    {
        label: 'Blackjack',
        url: '/blackjack',
        icon: '/assets/icons/cards.svg',
    },
    {
        label: 'Towers',
        url: '/towers',
        icon: '/assets/icons/tower.svg',
    },
    {
        label: 'Mines',
        url: '/mines',
        icon: '/assets/icons/bomb.svg',
    },
    {
        label: 'Lottery',
        url: '/lottery',
        icon: '/assets/icons/ticket.svg',
    },
    {
        label: 'JackPot',
        url: '/jackpot',
        icon: '/assets/icons/cherry.svg',
    },
    {
        label: 'News',
        url: '/news',
        icon: '/assets/icons/news.svg',
    },
];

export { NAV_LINKS, INavLink };
