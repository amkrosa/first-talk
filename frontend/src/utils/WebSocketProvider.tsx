import React, {createContext, useContext, useEffect, useRef} from 'react';
import SockJS from 'sockjs-client';
import {Client, Frame, Message, over} from 'stompjs';
import {useAppDispatch} from "../store/hooks";
import {connect, shouldNotConnect, disconnect as disconnectAction} from "../store/websocket/actions";

interface WebSocketContextValue {
    subscribe: (destination: string, onMessage: (message: Message) => void) => void;
    unsubscribe: (destination: string) => void;
    disconnect: (onDisconnect?: () => any) => void;
    sendMessage: (destination: string, message: any) => void;
}

interface WebSocketProviderProps {
    url: string;
    token: string;
    shouldConnect: boolean;
    children: React.ReactNode;
}

const WebSocketContext = createContext<WebSocketContextValue>({
    subscribe: () => {},
    unsubscribe: () => {},
    disconnect: () => {},
    sendMessage: () => {},
});

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({url, token, shouldConnect, children}) => {
    const clientRef = useRef<Client | null>(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (shouldConnect && token) {
            const socket = new SockJS(`${url}?token=${token}`);
            const client = over(socket);
            clientRef.current = client;
            client.connect({}, (frame?: Frame) => {
                if (frame?.headers && !(frame.headers as any)['user-name']) {
                    client.disconnect(() => {
                    }, {})
                }
                console.log('Connected to WebSocket server');
                dispatch(connect())
            });
        }
    }, [url, shouldConnect]);

    const sendMessage = (destination: string, message: any) => {
        if (clientRef.current?.connected) {
            const payload = JSON.stringify(message);
            console.debug(`Sending message to ${destination}. Message=${payload}`)
            clientRef.current.send(destination, {}, payload);
        }
    };

    const subscribe = (destination: string, onMessage: (message: Message) => void) => {
        if (clientRef.current?.connected) {
            console.debug(`Subscribing to ${destination}`)
            clientRef.current?.subscribe(destination, onMessage);
        }
    }

    const unsubscribe = (destination: string) => {
        if (clientRef.current?.connected) {
            //TODO? what is id in this context?
            clientRef.current?.unsubscribe(destination);
        }
    }

    const disconnect = (onDisconnect?: () => void) => {
        if (clientRef.current?.connected) {
            onDisconnect ? clientRef.current?.disconnect(onDisconnect) : clientRef.current?.disconnect(()=>{});
            dispatch(shouldNotConnect())
            dispatch(disconnectAction())
        }
    }

    return (
        <WebSocketContext.Provider value={{subscribe, unsubscribe, sendMessage, disconnect}}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => useContext(WebSocketContext);