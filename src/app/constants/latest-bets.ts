interface Ibets{
    player: string;
    game: string;
    img: string;
    time: string;
    wager: string;
    multiplier: string;
    payout: string;
}

const latestBets: Ibets[] = [
    {
        player: 'JackUser',
        game: 'Roulette',
        img : '/assets/games/roulette.png',
        time: '10s',
        wager: '50.00$',
        multiplier: 'x1.5',
        payout: '250$',
    },
    {
        player: 'EmilyUser',
        game: 'Slots',
        img : '/assets/games/slots.png',
        time: '15s',
        wager: '12.00$',
        multiplier: 'x2.5',
        payout: '150$',
    },
    {
        player: 'JackUser',
        game: 'Towers',
        img : '/assets/games/towers.png',
        time: '10s',
        wager: '50.00$',
        multiplier: 'x1.5',
        payout: '250$',
    },
];

export {latestBets , Ibets}