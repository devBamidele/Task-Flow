export interface UserState {
    name : string,
    email : string,
    isOnline : boolean,
}

export interface UserInfo {
    id: string;
    name: string | null;
    email: string;
    photo: string | null;
    familyName: string | null;
    givenName: string | null;
}