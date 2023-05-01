import React, {useEffect, useState} from 'react';
import {setInputValue} from '../store/chat/actions';
import LoginForm from './LoginForm';
import {createStompClient,} from '../utils/webSocketUtils';
import {Client, Frame} from "stompjs";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {selectChat} from "../store/chat/reducer";
import {selectUser} from "../store/user/reducer";
import RoomsGrid from "./RoomsGrid";

const WebSocketApp: React.FC = () => {
    const [client, setClient] = useState<Client | null>(null);
    const {
        connected,
        username,
        usernameEntered,
        isAdmin,
        chatRoomId,
        messages,
        inputValue,
    } = useAppSelector(selectChat);
    const {
        token,
        user,
        loggedIn,
    } = useAppSelector(selectUser);
    const dispatch = useAppDispatch();

    // useEffect(() => {
    //     if (token?.token) {
    //         const client = createStompClient(token?.token)
    //         setClient(client)
    //         client.connect({}, (frame?: Frame) => {
    //             console.log(frame?.headers)
    //             if (frame?.headers && !(frame.headers as any)['user-name']) {
    //                 client.disconnect(() => {
    //                 }, {})
    //             }
    //         })
    //     }
    // }, [loggedIn, token?.token])

    const sendMessage = (content: string) => {
        if (client && connected && username && chatRoomId) {
            client.send(
                `/app/chat/${chatRoomId}`,
                {},
                JSON.stringify({sender: username, content})
            );
            dispatch(setInputValue(''));
        }
    };

    const handleSplit = () => {
        if (client && connected && isAdmin) {
            client.send('/app/lobby', {}, JSON.stringify({isAdmin}));
        }
    };

    if (!loggedIn) {
        return <LoginForm/>;
    }

    return (
        <div>
            <RoomsGrid/>
        </div>
    );
};

export default WebSocketApp;