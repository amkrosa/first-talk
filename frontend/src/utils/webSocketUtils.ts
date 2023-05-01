import SockJS from 'sockjs-client';
import {Client, Frame, Message, over} from 'stompjs';
import {User} from "../types/types";

export const createStompClient = (token: string): Client => {
    const sockJSClient = new SockJS(`http://localhost:8080/ws?token=${token}`);
    return over(sockJSClient);
};

export const disconnectClient = (client: Client): void => {
    client.disconnect(() => {});
};