import React, {useRef} from 'react';
import {useAppSelector} from "../store/hooks";
import {selectChat} from "../store/chat/reducer";

interface ChatRoomProps {
    chatRoomId: string;
    inputValue: string;
    onSendMessage: (content: string) => void;
    onInputChange: (value: string) => void;
}

const ChatRoom: React.FC<ChatRoomProps> = ({
                                               chatRoomId,
                                               inputValue,
                                               onSendMessage,
                                               onInputChange,
                                           }) => {
    const {messages, username} = useAppSelector(selectChat);
    const inputRef = useRef<HTMLInputElement>(null);

    const sendMessage = () => {
        if (inputValue) {
            onSendMessage(inputValue);
            inputRef.current?.focus();
        }
    };

    return (
        <div>
            <h2>Chatroom {chatRoomId}</h2>
            <h3>as {username}</h3>
            <ul>
                {messages.map((message: string, i: number) => (
                    <li key={i}>{message}</li>
                ))}
            </ul>
            <input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => onInputChange(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        sendMessage();
                    }
                }}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default ChatRoom;