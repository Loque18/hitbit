type Balance = {
    crypto: 'eth' | 'bnb' | 'matic';
    amount: number;
};

type UserData = {
    username: string;

    balance: Balance[];
};

export { UserData, Balance };
