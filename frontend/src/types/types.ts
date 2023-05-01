export interface User {
    username: string,
    email?: string,
    id: string,
    interests?: Array<string>,
}

export interface Topic {
    name: string,
    color: string,
}

export interface Token {
    token: string,
    expirationDate: string
}

export interface Room {
    name: string,
    id: string,
    userCount: number,
    maxUserCount?: number,
    inProgress: boolean,
}

export interface RoomMessage {
    action: "JOIN" | "SPLIT" | "LEAVE" | "KICK" | "UPDATE",
    userId?: string,
    username?: string,
    users?: User[]
}

export interface ChatMessage {
    username: string,
    message: string,
}