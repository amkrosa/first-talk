import React, {useEffect, useState} from 'react';
import {useAppSelector} from "../store/hooks";
import {selectChat} from "../store/chat/reducer";
import {ChatMessage, RoomMessage, User} from "../types/types";
import {TOPICS} from "../static/topics";
import {selectRoom} from "../store/room/reducer";
import {useWebSocket} from "../utils/WebSocketProvider";
import {
    ROOM_DESTINATION,
    ROOM_MESSAGES_DESTINATION,
    ROOM_MESSAGES_SUBSCRIPTION,
    ROOM_SUBSCRIPTION
} from "../utils/webSocketDestinations";
import {useParams} from "react-router-dom";
import {selectUser} from "../store/user/reducer";
import {selectWebsocket} from "../store/websocket/reducer";
import "./Room.css";
import {Box, Button, Chip, Container, Grid, Paper, TextField, Typography,} from '@mui/material';
import styled from '@emotion/styled';

const ChatBox = styled(Paper)`
  display: flex;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 1rem;
`;

const ChatPanel = styled('div')`
  flex: 0.7;
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 1rem;
`;

const UserList = styled('div')`
  flex: 0.3;
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 1rem;
  border-left: 1px solid #ccc;
`;

const UserStyled = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-bottom: 0.5rem;
  cursor: pointer;
  position: relative;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const UserTag = styled(Chip)`
  background-color: #3f51b5;
  color: white;
  font-size: 0.8rem;
  margin-right: 0.25rem;
  padding: 0.25rem 0.5rem;
`;

const KickBtn = styled(Button)`
  background-color: #f44336;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-weight: bold;
`;

const Room: React.FC = () => {
    const {isAdmin} = useAppSelector(selectChat);
    const [users, setUsers] = useState<User[]>([]);
    const {roomId} = useParams();
    const {currentRoom} = useAppSelector(selectRoom)
    const {subscribe, sendMessage} = useWebSocket();
    const {user} = useAppSelector(selectUser);
    const {connected} = useAppSelector(selectWebsocket);
    const [inputMessage, setInputMessage] = useState("");
    const [messages, setMessages] = useState<ChatMessage[]>([]);

    const mapCurrentUserToUserMessage = () => {
        if (user) {
            return {id: user?.id, username: user?.username};
        }
    }

    useEffect(() => {
        console.log("Entered Room useEffect")
        console.log(`room id ${roomId}`)
        if (roomId && connected) {
            subscribe(ROOM_SUBSCRIPTION(roomId), (message) => {
                //TODO refactor this, need some mapping implemented or split it into different topics
                const body: RoomMessage = JSON.parse(message.body);
                console.log("onMessage parsed body");
                console.log(body);
                switch (body.action) {
                    case "JOIN":
                        if (body.userId && body.username)
                            setUsers([...users, {id: body.userId, username: body.username}]);
                        break;
                    case "UPDATE":
                        if (body.users)
                            setUsers(body.users);
                        break;
                }
            })
            if (user) {
                console.log("sending message...")
                sendMessage(ROOM_DESTINATION(roomId), {action: "JOIN", userId: user?.id})
                console.log("message sent")
            }

            subscribe(ROOM_MESSAGES_SUBSCRIPTION(roomId), (message) => {
                const body = JSON.parse(message.body);
                setMessages(previousState => [...previousState, {username: body.user.username, message: body.message}])
            })
        }
    }, [connected])

    const getInterestColor = (interest: string) => {
        const topic = TOPICS.topics.find((topic) => topic.name === interest);
        return topic ? topic.color : '#000';
    };

    const handleSendMessage = (e: React.FormEvent | React.KeyboardEvent) => {
        e.preventDefault();
        if (inputMessage.trim() && user) {
            sendMessage(ROOM_MESSAGES_DESTINATION(roomId ?? "undefined"), {
                user: mapCurrentUserToUserMessage(),
                message: inputMessage.trim()
            })
            setInputMessage("")
        }
    }

    return (
        <Container maxWidth="md">
            <Typography variant="h4" align="center" gutterBottom>
                Room {currentRoom?.name ?? 'Unknown'}
            </Typography>
            <Grid container justifyContent="center">
                <Grid item xs={12}>
                    <ChatBox>
                        <ChatPanel>
                            {messages.map((chatMessage, index) => (
                                <Typography
                                    key={index}>{chatMessage.username}: {chatMessage.message.trim()}</Typography>
                            ))}
                        </ChatPanel>
                        <UserList>
                            {users.map((user, index) => (
                                <UserStyled key={index}>
                                    <Typography>{user.username}</Typography>
                                    <Box display="flex" flexWrap="wrap" mb={1}>
                                        <UserTag label={"ayyy"}/>
                                        <UserTag label={"yyyy"}/>
                                        {user.interests && user.interests.map((tag, i) => (
                                            <UserTag key={i} label={tag}/>
                                        ))}
                                    </Box>
                                    <KickBtn onClick={() => {
                                    }}>Kick</KickBtn>
                                </UserStyled>
                            ))}
                        </UserList>
                    </ChatBox>
                    <Box>
                        <TextField
                            fullWidth
                            onChange={e => setInputMessage(e.target.value)}
                            placeholder="Type your message..."
                            variant="outlined"
                        />
                        <Button variant="contained"
                                color="primary"
                                onClick={handleSendMessage}>
                            Send
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Room;