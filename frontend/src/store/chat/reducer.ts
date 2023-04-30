import {
    connect,
    disconnect,
    setMessages,
    setInputValue,
    setUsername,
    setUsernameEntered, setIsAdmin, setChatRoomId, setLobbyUsers, createClient,
} from './actions';
import {Client} from "stompjs";
import {createStompClient} from "../../utils/webSocketUtils";
import {createAction, createReducer} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {User} from "../../types/types";

interface ChatState {
    connected: boolean,
    messages: Array<string>,
    inputValue: string,
    username: string,
    usernameEntered: boolean,
    isAdmin: boolean,
    chatRoomId: string | null,
    lobbyUsers: Array<User>,
}

const initialState: ChatState = {
    connected: false,
    messages: [],
    inputValue: '',
    username: '',
    usernameEntered: false,
    isAdmin: false,
    chatRoomId: null,
    lobbyUsers: [],
};

export const chatReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(connect, (state) => {
            state.connected = true;
        })
        .addCase(disconnect, (state) => {
            state.connected = false;
        })
        .addCase(setMessages, (state, action) => {
            state.messages = action.payload;
        })
        .addCase(setInputValue, (state, action) => {
            state.inputValue = action.payload;
        })
        .addCase(setUsername, (state, action) => {
            state.username = action.payload;
        })
        .addCase(setUsernameEntered, (state, action) => {
            state.usernameEntered = action.payload;
        })
        .addCase(setIsAdmin, (state, action) => {
            state.isAdmin = action.payload;
        })
        .addCase(setChatRoomId, (state, action) => {
            state.chatRoomId = action.payload;
        })
        .addCase(setLobbyUsers, (state, action) => {
            state.lobbyUsers = action.payload;
        })
});

export const selectChat = (state: RootState) => state.chat