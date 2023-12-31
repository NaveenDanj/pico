
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

export interface Contact {
    ownerId : string,
    userUID : string,
    contactName : string,
    blocked : boolean
}

export interface ChatContact {
    ownerId : string,
    userUID : string,
    contactName : string,
    blocked : boolean
    dp: string,
}

export interface Message {
    uid?:string;
    message: string;
    chatroomId: string;
    attachments : string[];
    timestamp: Date;
    isReplied: boolean;
    repliedTo: Message | null;
    sender?:string;
}

export interface ChatRoom {
    uid: string;
    user1: string;
    user2: string;
    lastMessage:Message | null;
    lastTimeStamp:Date | null;
}

export interface GlobalInbox {
    message:Message,
    timestamp:Date,
    fromUser:string;
    chatroomId:string;
}

export interface ChatRoomDTO {
    uid: string;
    contats: ChatContact;
    lastMessage:Message | null;
    lastTimeStamp:Date | null;
}

export interface EmailSettingsDTO {
    email:string,
    host:string,
    password:string,
    port:number,
    tls:boolean
}

export interface SignalData {
    type: string;
    sdp?: string;
    candidate?: string;
}

export interface CallDTO {
    id:string,
    callerId:string,
    calleeId:string,
    callerPeerId:string|null,
    calleePeerId:string|null,
    timestamp:Date
    answered:boolean,
    dp:string,
    contactName:string
}

export interface Attachment {
    user:string
    fileName: string,
    originalFileName: string,
    extension: string,
    fileSize: number,
    url:string,
    chatRoomId:string | null,
    messageId: string | null,
    timestamp: Date,
    type: string
}