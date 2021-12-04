import { Message } from "./message";
import { User } from "./user";

export interface SingleUserChat {
    id: number;
    title: string;
    creationDate: Date;
    messagesId?: any;
    messages: Message[];
    originUserId: number;
    originUser: User;
    recipientUserId: number;
    recipientUser: User;
    chatBanned: boolean;
    maxAmountPersons: number;
    hashBase64: string;
    private: boolean;
    bannedUsersId?: any;
    bannedUsers: User[];
}