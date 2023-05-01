import {
    setChatRoomId,
    setInputValue,
    setIsAdmin,
    setLobbyUsers,
    setMessages,
} from './actions';
import {createReducer} from "@reduxjs/toolkit";
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
        .addCase(setMessages, (state, action) => {
            state.messages = action.payload;
        })
        .addCase(setInputValue, (state, action) => {
            state.inputValue = action.payload;
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