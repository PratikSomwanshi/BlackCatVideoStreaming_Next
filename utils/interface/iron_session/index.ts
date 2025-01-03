// session interfaces

export interface SessionData {
    username?: string;
    email?: string;
    token?: string;
    isPremiumUser: boolean;
    isLoggedIn: boolean;
}

export interface loginData {
    username: string;
    email: string;
    password: string;
}
