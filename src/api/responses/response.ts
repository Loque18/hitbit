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
    event: string;
    data: {
        state: string;
        bets: [];
        hash: string | null;
        'round-id': string;

        times: {
            game_init: { start: string; end: string };
            taking_bets: { start: string; end: string };
            show_results: { start: string; end: string };
            game_end: { start: string; end: string };
        };

        winningNumber: number | null;
        spinNumber: number | null;
    };
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
