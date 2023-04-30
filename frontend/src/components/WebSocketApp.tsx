import React, {useEffect, useState} from 'react';
import {connect, disconnect, setChatRoomId, setInputValue, setLobbyUsers, setMessages} from '../store/chat/actions';
import LoginForm from './LoginForm';
import Lobby from './Lobby';
import ChatRoom from './ChatRoom';
import {createStompClient, disconnectClient, onConnect,} from '../utils/webSocketUtils';
import {Client, Message} from "stompjs";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {selectChat} from "../store/chat/reducer";
import {User} from "../types/types";
import {UserRequest, UserResponse, UserRestControllerApi} from "../api";
import axios from "axios";

const WebSocketApp: React.FC = () => {
    const [client, setClient] = useState<Client>(createStompClient());
    const {
        connected,
        username,
        usernameEntered,
        isAdmin,
        chatRoomId,
        messages,
        inputValue,
    } = useAppSelector(selectChat);
    const dispatch = useAppDispatch();


    useEffect(() => {
        const api = new UserRestControllerApi()
        const response = api.registerGuestUser({name: "bruhnia", interests: []})
            .then(res => {
                console.log(res.data)
            })

        onConnect(
            "iksde",
            client,
            (value: boolean) => {
                if (value) {
                    dispatch(connect());
                } else {
                    dispatch(disconnect());
                }
            },
            (message: Message) => {
                const {sender, content} = JSON.parse(message.body);
                dispatch(setMessages([...messages, `${sender}: ${content}`]));
            },
            (chatRoomId: string) => {
                dispatch(setChatRoomId(chatRoomId));
            },
            (lobbyUsers: User[]) => {
                dispatch(setLobbyUsers(lobbyUsers));
            }
        );

        return () => {
            if (client.connected) {
                disconnectClient(client);
            }
        };
    }, [messages, dispatch]);

    const sendMessage = (content: string) => {
        if (connected && username && chatRoomId) {
            client.send(
                `/app/chat/${chatRoomId}`,
                {},
                JSON.stringify({sender: username, content})
            );
            dispatch(setInputValue(''));
        }
    };

    const handleSplit = () => {
        if (connected && isAdmin) {
            client.send('/app/lobby', {}, JSON.stringify({isAdmin}));
        }
    };

    if (!usernameEntered) {
        return <LoginForm client={client}/>;
    }

    return (
        <div className="App">
            {!chatRoomId && <Lobby onSplit={handleSplit}/>}
            {chatRoomId && (
                <ChatRoom
                    chatRoomId={chatRoomId}
                    inputValue={inputValue}
                    onSendMessage={sendMessage}
                    onInputChange={(value: string) => dispatch(setInputValue(value))}
                />
            )}
        </div>
    );
};

export default WebSocketApp;