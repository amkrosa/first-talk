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
/*
    record BreakoutRoomCreated(String id, List<UserDto> users) {
        static BreakoutRoomCreated of(BreakoutRoom breakoutRoom) {
            var users = breakoutRoom.getUsers().stream()
                    .map(UserDto::of)
                    .toList();
            return new BreakoutRoomCreated(breakoutRoom.getId().toString(), users);
        }
    }
 */
export interface BreakoutRoomCreated {
    id: string,
    users: User[]
}