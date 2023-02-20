interface Lbets{
    img:string;
    player: string;
    _player : string;
    date: string;
    _date: string;
    wager: string;
    _wager: string;
    multiplier: string;
    _multiplier: string;
    payout: string;
    _payout: string;
}

const leaderBoards: Lbets[] = [
    {
        img : '/assets/',
        player: 'JackUser',
        _player : 'Player',
        date:'1/17/2023',
        _date : 'Date',
        wager: '50.00$',
        _wager : 'Wager',
        multiplier: 'x1.5',
        _multiplier : 'Multiplier',
        payout: '250$',
        _payout : 'Payout',
    },
    {
        img : '/assets/',
        player: 'EmilyUser',
        _player : 'Player',
        date:'1/17/2023',
        _date : 'Date',
        wager: '100.00$',
        _wager : 'Wager',
        multiplier: 'x2',
        _multiplier : 'Multiplier',
        payout: '200$',
        _payout : 'Payout',
    },
];

export {Lbets , leaderBoards}
