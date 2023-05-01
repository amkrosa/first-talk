import {Action} from 'redux';
import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import {User} from "../../types/types";
import {ChatRestControllerApi} from "../../api";

export const SET_MESSAGES = 'SET_MESSAGES';
export const SET_MESSAGE = 'SET_INPUT_VALUE';
export const SET_IS_ADMIN = 'SET_IS_ADMIN';
export const SET_CHAT_ROOM_ID = 'SET_CHAT_ROOM_ID';
export const SET_LOBBY_USERS = 'SET_LOBBY_USERS';

export interface SetMessagesAction extends Action<typeof SET_MESSAGES> {
    payload: string[];
}

export interface SetInputValueAction extends Action<typeof SET_MESSAGE> {
    payload: string;
}

export interface SetIsAdminAction extends Action<typeof SET_IS_ADMIN> {
    payload: boolean;
}

export interface SetChatRoomIdAction
    extends Action<typeof SET_CHAT_ROOM_ID> {
    payload: string | null;
}

export interface SetLobbyUsersAction
    extends Action<typeof SET_LOBBY_USERS> {
    payload: string[];
}

export type ChatActionTypes =
    | SetMessagesAction
    | SetInputValueAction
    | SetIsAdminAction
    | SetChatRoomIdAction
    | SetLobbyUsersAction;

export const setMessages = createAction<string[]>(SET_MESSAGES);
export const setInputValue = createAction<string>(SET_MESSAGE);
export const setIsAdmin = createAction<boolean>(SET_IS_ADMIN);
export const setChatRoomId = createAction<string | null>(SET_CHAT_ROOM_ID);
export const setLobbyUsers = createAction<User[]>(SET_LOBBY_USERS);
