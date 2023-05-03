import React, {useEffect, useState} from 'react';
import {useAppSelector} from "../store/hooks";
import {selectChat} from "../store/chat/reducer";
import {ChatMessage, Token, User} from "../types/types";
import {useWebSocket} from "../utils/WebSocketProvider";
import {BREAKOUT_ROOM_MESSAGES_DESTINATION, BREAKOUT_ROOM_MESSAGES_SUBSCRIPTION} from "../utils/webSocketDestinations";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {selectUser} from "../store/user/reducer";
import {selectWebsocket} from "../store/websocket/reducer";
import "./Room.css";
import ChatRoom from "./ChatRoom";

const BreakoutRoom: React.FC = () => {
    const {isAdmin} = useAppSelector(selectChat);
    const [users, setUsers] = useState<User[]>([]);
    const {roomId, breakoutRoomId} = useParams();
    const {state} = useLocation();
    const {otherUserName, otherUserId} = state;
    const {subscribe, sendMessage} = useWebSocket();
    const {user} = useAppSelector(selectUser);
    const {connected} = useAppSelector(selectWebsocket);
    const [subscribed, setSubscribed] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const navigate = useNavigate()

    const mapCurrentUserToUserMessage = () => {
        if (user) {
            return {id: user?.id, username: user?.username};
        }
    }

    const getBreakoutRoomUsers = () => {
        return [
            {id: user!.id, username: user!.username},
            {id: otherUserId, username: otherUserName}
        ];
    }

    const handleRefresh = () => {
        console.log("On refresh")
        const localStorageToken = localStorage.getItem("token");
        const localStorageTokenExpiration = localStorage.getItem("tokenExpiration");
        if (localStorageToken && localStorageTokenExpiration) {
            const token: Token = {
                token: localStorageToken,
                expirationDate: localStorageTokenExpiration
            };
            //TODO finish...
        }
    }

    useEffect(() => {
        if (!user) {
            navigate("/")
        }
        console.log("Entered Room useEffect")
        console.log(`room id ${roomId}, breakout room id ${breakoutRoomId}`)
        setUsers(getBreakoutRoomUsers())
        if (roomId && breakoutRoomId && connected && !subscribed) {
            subscribe(BREAKOUT_ROOM_MESSAGES_SUBSCRIPTION(roomId!, breakoutRoomId!), (message) => {
                const body = JSON.parse(message.body);
                setMessages(previousState => [...previousState, {username: body.user.username, message: body.message}])
            })
            setSubscribed(true);
        }
    }, [connected])

    const handleSendMessage = (inputMessage: string) => {
        if (inputMessage.trim() && user && roomId && breakoutRoomId) {
            sendMessage(BREAKOUT_ROOM_MESSAGES_DESTINATION(roomId, breakoutRoomId), {
                user: mapCurrentUserToUserMessage(),
                message: inputMessage.trim()
            })
        }
    }

    return (
        <ChatRoom
            messages={messages}
            users={users}
            roomName={`${user?.username} & ${otherUserName}`}
            onFinish={() => {
            }}
            onSendMessage={handleSendMessage}
            breakout
        />
    );
};

export default BreakoutRoom;