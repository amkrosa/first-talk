import SockJS from 'sockjs-client';
import {Client, Frame, Message, over} from 'stompjs';
import {User} from "../types/types";

export const createStompClient = (): Client => {
    const token = "xdddddd"
    const sockJSClient = new SockJS(`http://localhost:8080/ws?token=${token}`);
    return over(sockJSClient);
};

export const onConnect = (
    userId: string,
    client: Client,
    setConnected: (connected: boolean) => void,
    setMessageCallback: (message: Message) => void,
    setChatRoomIdCallback: (chatRoomId: string) => void,
    setLobbyUsersCallback: (lobbyUsers: User[]) => void
): void => {
    const connectCallback = (frame?: Frame) => {
        setConnected(true);
        client.subscribe('/user/queue/messages', setMessageCallback);
        client.subscribe('/user/queue/chat-room', (message: Message) => {
            console.log(message.body)
            setChatRoomIdCallback(message.body);
        });
        client.subscribe('/topic/lobby', (message: Message) => {
            console.log(message)
            console.log(message.body)
            setLobbyUsersCallback(JSON.parse(message.body));
        });
    };

    const headers = {
        Authorization: `Bearer ${userId}`,
    }

    client.connect(headers, connectCallback);
};

export const disconnectClient = (client: Client): void => {
    client.disconnect(() => {});
};