import React, {useEffect, useState} from 'react';
import {useAppSelector} from "../store/hooks";
import {selectChat} from "../store/chat/reducer";
import {BreakoutRoomCreated, ChatMessage, RoomMessage, Token, User} from "../types/types";
import {TOPICS} from "../static/topics";
import {selectRoom} from "../store/room/reducer";
import {useWebSocket} from "../utils/WebSocketProvider";
import {
    ROOM_DESTINATION,
    ROOM_MESSAGES_DESTINATION,
    ROOM_MESSAGES_SUBSCRIPTION, ROOM_SPLIT_USER_SUBSCRIPTION,
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

interface ChatRoomProps {
    messages: ChatMessage[],
    breakout?: boolean | false,
    users: User[],
    roomName: string,
    onFinish: () => void,
    onSendMessage: (inputMessage: string) => void
    onSplit?: () => void,
}

const ChatRoom: React.FC<ChatRoomProps> = ({messages, users, roomName, onFinish, onSendMessage, onSplit, breakout = false}) => {
    const [inputMessage, setInputMessage] = useState("")

    const getInterestColor = (interest: string) => {
        const topic = TOPICS.topics.find((topic) => topic.name === interest);
        return topic ? topic.color : '#000';
    };

    const mapUsers = (users: User[]) => {
        return users.map((user, index) => (
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
        ))
    }

    const handleSendMessage = () => {
        onSendMessage(inputMessage);
        setInputMessage("");
    }

    return (
        <Container maxWidth="md">
            <Typography variant="h4" align="center" gutterBottom>
                Room {roomName}
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
                            {mapUsers(users)}
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
                        {!breakout && <Button color="warning" onClick={onSplit}>Split</Button>}
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}

export default ChatRoom;