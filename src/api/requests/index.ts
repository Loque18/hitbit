type LoginRequest = {
    email: string;
    password: string;
};

type Web3LoginRequest = {
    address: string;
    signature: string;
};

type SignupRequest = {
    email: string;
    password: string;
};

export { LoginRequest, Web3LoginRequest, SignupRequest };
