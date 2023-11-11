export interface UserData {
    email : string | null,
    displayName : string,
    photoURL : string,
    uid : string,
    phoneNumber : string
}

export interface UserAdditionalData {
    uid: string,
    dp: string,
    FirstName: string,
    LastName : string,
    email : string | null,
    phoneNumer : string,
    about: string,
    blockedContact: string[],
    addToGroups: boolean,
    readReceipt : boolean,
    archivedContact: string[],
    disappearingmessages: boolean,
    created: Date | null
}