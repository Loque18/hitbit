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

export { ApiResponse, LoginResponse };

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
