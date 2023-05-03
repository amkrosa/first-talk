import React, {useEffect, useState} from 'react';
import {useAppSelector} from "../store/hooks";
import {selectChat} from "../store/chat/reducer";
import {BreakoutRoomCreated, ChatMessage, RoomMessage, Token, User} from "../types/types";
import {selectRoom} from "../store/room/reducer";
import {useWebSocket} from "../utils/WebSocketProvider";
import {
    ROOM_DESTINATION,
    ROOM_MESSAGES_DESTINATION,
    ROOM_MESSAGES_SUBSCRIPTION, ROOM_SPLIT_DESTINATION,
    ROOM_SPLIT_USER_SUBSCRIPTION,
    ROOM_SUBSCRIPTION
} from "../utils/webSocketDestinations";
import {useNavigate, useParams} from "react-router-dom";
import {selectUser} from "../store/user/reducer";
import {selectWebsocket} from "../store/websocket/reducer";
import "./Room.css";
import ChatRoom from "./ChatRoom";
import {BREAKOUT_ROOM_PATH} from "../utils/router";

const MainRoom: React.FC = () => {
    const {isAdmin} = useAppSelector(selectChat);
    const [users, setUsers] = useState<User[]>([]);
    const {roomId} = useParams();
    const {currentRoom} = useAppSelector(selectRoom)
    const {subscribe, sendMessage} = useWebSocket();
    const {user} = useAppSelector(selectUser);
    const {connected} = useAppSelector(selectWebsocket);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const navigate = useNavigate();
    const [subscribed, setSubscribed] = useState(false);


    const mapCurrentUserToUserMessage = () => {
        if (user) {
            return {id: user?.id, username: user?.username};
        }
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
        console.log("Entered Room useEffect")
        console.log(`room id ${roomId}`)
        if (!user) {
            navigate("/")
        }

        if (roomId && connected && !subscribed) {
            subscribe(ROOM_SUBSCRIPTION(roomId!), (message) => {
                //TODO refactor this, need some mapping implemented or split it into different topics
                const body: RoomMessage = JSON.parse(message.body);
                console.log("onMessage parsed body");
                console.log(body);
                if (body.action === "JOIN" && body.userId && body.username) {
                    setUsers([...users, {id: body.userId, username: body.username}]);
                } else if (body.action === "UPDATE" && body.users) {
                    setUsers(body.users);
                }
            })
            if (user) {
                sendMessage(ROOM_DESTINATION(roomId!), {action: "JOIN", userId: user?.id})
            }

            subscribe(ROOM_MESSAGES_SUBSCRIPTION(roomId!), (message) => {
                const body = JSON.parse(message.body);
                setMessages(previousState => [...previousState, {username: body.user.username, message: body.message}])
            })

            subscribe(ROOM_SPLIT_USER_SUBSCRIPTION(roomId!), (message) => {
                const body: BreakoutRoomCreated = JSON.parse(message.body);
                const otherUser: User | null = body.users.find(u => u.id !== user!.id) ?? null
                if (!otherUser) {
                    console.error("Could not find user in room split message")
                    return;
                }
                navigate(
                    BREAKOUT_ROOM_PATH.replace(":breakoutRoomId", body.id).replace(":roomId", roomId),
                    {state: {otherUserName: otherUser.username, otherUserId: otherUser.id}})
            })
            setSubscribed(true)
        }
    }, [connected])

    const handleSendMessage = (inputMessage: string) => {
        if (inputMessage.trim() && user) {
            sendMessage(ROOM_MESSAGES_DESTINATION(roomId ?? "undefined"), {
                user: mapCurrentUserToUserMessage(),
                message: inputMessage.trim()
            })
        }
    }

    const handleSplit = () => {
        if (users.length % 2 !== 0) {
            console.error("current room size is not even. Add or remove user");
            return;
        }

        if (roomId && connected) {
            sendMessage(ROOM_SPLIT_DESTINATION(roomId), {command: "CREATE_BREAKOUT_ROOMS"})
        }
    }

    return (
        <ChatRoom
            messages={messages}
            users={users}
            roomName={currentRoom?.name ?? "Unknown"}
            onFinish={() => {}}
            onSendMessage={handleSendMessage}
            onSplit={handleSplit}
        />
    );
};

export default MainRoom;