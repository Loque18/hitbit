interface ApiResponse {
    success: boolean;
    message: string;
    statusCode: number;
}

interface LoginResponse {
    // all props from ApiResponse
    success: boolean;
    message?: string;
    data?: {
        verificatonToken: string;
    };
    statusCode?: number;
}

type WalletLoginResponse = {
    success: boolean;
    message?: string;
    token?: string;
    statusCode?: number;
};

// *~~*~~*~~ Roulette  *~~*~~*~~ //

type R_ActiveGameResponse = {
    state: string;
    hash: string | null;
    'round-id': string;

    times: {
        game_init: { start: number; end: number };
        taking_bets: { start: number; end: number };
        spin: { start: number; end: number };
        show_results: { start: number; end: number };
    };

    winningNumber: number | null;
    spinNumber: number | null;
};

export { ApiResponse, LoginResponse };

export { R_ActiveGameResponse };

// type ApiResponse = {
//     success: boolean;
//     message?: string;
//     statusCode?: number;
// };

// type LoginResponse = ApiResponse & {
//     privateKey?: string;
// };

// type WalletLoginResponse = ApiResponse & {
//     address?: string;
//     privateKey?: string;
// };

// // prettier-ignore
// export {
//     ApiResponse,
//     LoginResponse,
//     WalletLoginResponse
// };
