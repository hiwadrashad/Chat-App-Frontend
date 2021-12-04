import { Message } from "./message";
import { User } from "./user";

export interface GeneralChat {
    id: number;
    title: string;
    creationDate: Date;
    messagesId?: any;
    messages: Message[];
    ownerId: number;
    owner: User;
    chatBanned: boolean;
    maxAmountPersons: number;
    password: string;
    private: boolean;
    bannedUsersId?: any;
    bannedUsers: any[];
}
