export interface Invitation {
    id: number;
    dateSend: Date;
    message: string;
    seen: boolean;
    accepted: boolean;
    grouptype: number;
    groupId: number;
}
