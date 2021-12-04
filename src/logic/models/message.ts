import { User } from "./user";

export interface Message {
    id: number;
    startDate: Date;
    endDate: Date;
    userId: number;
    user: User;
    text: string;
}