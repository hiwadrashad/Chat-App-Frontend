export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    attemptedPassword: string;
    salt: string;
    hashBase64: string;
    role: number;
}