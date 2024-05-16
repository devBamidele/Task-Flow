export interface userState {
    name : string,
    token : string,
    email : string,
}

export interface startUp {
    user : userState,
    isLoggedIn : boolean,
}
