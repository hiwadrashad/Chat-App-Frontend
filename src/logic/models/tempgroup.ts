import { User } from "./user";

export class TempGroup
{
    title : string = "";
    users : User[] = [];
    userlimit : number = 0;
    private : boolean = false;
    password : string = ""
}