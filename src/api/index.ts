import { environment } from 'src/environments/environment';

// enum JsendStatus {
//     success = "success",
//     fail = "fail",
//     error = "error",
// }

// interface JsendSuccess {
//     status: JsendStatus.success;
//     data: {
//         [key: string]: any;
//     } | null;
// }

// interface JsendFail {
//     status: JsendStatus.fail;
//     data: {
//         [key: string]: any;
//     } | null;
// }

// interface JsendError {
//     status: JsendStatus.error;
//     message: string;
//     code?: number;
//     data?: {
//         [key: string]: any;
//     } | null;
// }

// class JSendFactory {
//     static success(data: any = null): JsendSuccess {
//         return {
//             status: jsendStatus.success,
//             data: data,
//         };
//     }

//     static fail(data: any = null): JSend {
//         return {
//             status: "fail",
//             data: data,
//         };
//     }

//     static error(message: string, data: any = null): JSend {
//         return {
//             status: "error",
//             message: message,
//             data: data,
//         };
//     }
// }

const baseUrl = environment.apiUrl;

const api = {
    url: environment.apiUrl,

    // *~~*~~*~~ Auth *~~*~~*~~ //
    auth: {
        signup: '/signup',
        login: '/login',
        loginWithWallet: '/loginwithwallet',
        verifyEmail: '/verifyEmail',
    },

    others: {
        nonce: '/addressnonce',
    },

    games: {
        roulette: {
            activeGame: `${baseUrl}/roulette/activeGame`,
        },
    },
};

export { api };
