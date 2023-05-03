const USER_PREFIX = "/user";
const PTP_PREFIX = "/queue";
const SERVER_PREFIX = "/app";
const BROADCAST_PREFIX = "/topic";
export const ROOM_SUBSCRIPTION = (roomId: string) => `${BROADCAST_PREFIX}/chat/rooms/${roomId}`;
export const ROOM_DESTINATION = (roomId: string) => `${SERVER_PREFIX}/chat/rooms/${roomId}`;
export const ROOM_MESSAGES_SUBSCRIPTION = (roomId: string) => `${BROADCAST_PREFIX}/chat/rooms/${roomId}/messages`;
export const ROOM_MESSAGES_DESTINATION = (roomId: string) => `${SERVER_PREFIX}/chat/rooms/${roomId}/messages`;
export const ROOM_SPLIT_USER_SUBSCRIPTION = (roomId: string) => `${USER_PREFIX}${PTP_PREFIX}/chat/rooms/${roomId}/split`;
export const ROOM_SPLIT_DESTINATION = (roomId: string) => `${SERVER_PREFIX}/chat/rooms/${roomId}/split`;
export const BREAKOUT_ROOM_MESSAGES_SUBSCRIPTION = (roomId: string, breakoutRoomId: string) => `${BROADCAST_PREFIX}/chat/rooms/${roomId}/${breakoutRoomId}/messages`;
export const BREAKOUT_ROOM_MESSAGES_DESTINATION = (roomId: string, breakoutRoomId: string) => `${SERVER_PREFIX}/chat/rooms/${roomId}/${breakoutRoomId}/messages`;

