import { User } from "./user";

export class TempSingle
{
    title : string = "";
    recipientuser : User = {} as User;
    senderuser : User = {} as User;
    private : boolean = false;
    password : string = ""
}