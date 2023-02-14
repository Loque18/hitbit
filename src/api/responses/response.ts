interface ApiResponse {
    success: boolean;
    message: string;
    statusCode: number;
}

interface LoginResponse {
    // all props from ApiResponse
    success: boolean;
    message?: string;
    token?: string;
    statusCode?: number;
}

export { ApiResponse, LoginResponse };
