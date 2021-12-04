import { Message } from "./message";
import { User } from "./user";

export interface GroupChat {
    id: number;
    title: string;
    creationDate: Date;
    messagesId?: any;
    messages: Message[];
    usersId?: any;
    users: User[];
    groupOwnerId: number;
    groupOwner: User;
    chatBanned: boolean;
    maxAmountPersons: number;
    hashBase64: string;
    private: boolean;
    bannedUsersId?: any;
    bannedUsers: User[];
}