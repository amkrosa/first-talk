const USER_PREFIX = "/user";
const POINT_TO_POINT_PREFIX = "/queue";
const SERVER_PREFIX = "/app";
const BROADCAST_PREFIX = "/topic";
export const ROOM_SUBSCRIPTION = (roomId: string) => `${BROADCAST_PREFIX}/chat/rooms/${roomId}`;
export const ROOM_DESTINATION = (roomId: string) => `${SERVER_PREFIX}/chat/rooms/${roomId}`;
export const ROOM_MESSAGES_SUBSCRIPTION = (roomId: string) => `${BROADCAST_PREFIX}/chat/rooms/${roomId}/messages`;
export const ROOM_MESSAGES_DESTINATION = (roomId: string) => `${SERVER_PREFIX}/chat/rooms/${roomId}/messages`;
