import { Invitation } from "./Invitation";

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    salt: string;
    hashBase64: string;
    role: number;
    banned: boolean;
    invitationsId?: any;
    invitations: Invitation[];
}