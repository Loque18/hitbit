interface INavLink {
    label: string;
    url: string;
    icon: string;
}

const tempImg = 'https://picsum.photos/64';

const NAV_LINKS: INavLink[] = [
    {
        label: 'All Games',
        url: '/home',
        icon: tempImg,
    },
    {
        label: 'Dice',
        url: '/dice',
        icon: tempImg,
    },
    {
        label: 'Slots',
        url: '/slots',
        icon: tempImg,
    },
    {
        label: 'Roulette',
        url: '/roulette',
        icon: tempImg,
    },
    {
        label: 'Blackjack',
        url: '/blackjack',
        icon: tempImg,
    },
    {
        label: 'Towers',
        url: '/towers',
        icon: tempImg,
    },
    {
        label: 'Mines',
        url: '/mines',
        icon: tempImg,
    },
    {
        label: 'Lottery',
        url: '/lottery',
        icon: tempImg,
    },
    {
        label: 'JackPot',
        url: '/jackpot',
        icon: tempImg,
    },
    {
        label: 'News',
        url: '/news',
        icon: tempImg,
    },
];

export { NAV_LINKS, INavLink };
