// request data that user sends
export interface LoginRequest {
    email: string;
    password: string;
}

// response from backend, only if valid
export interface LoginResponse {
    accessToken: String;
    //refreshToken: RefreshToken;
    tokenType: string;
}