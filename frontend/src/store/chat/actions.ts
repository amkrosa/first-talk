import {Client} from "stompjs";
import {Action} from 'redux';
import {createAction} from "@reduxjs/toolkit";
import {User} from "../../types/types";

export const CONNECT = 'CONNECT';
export const DISCONNECT = 'DISCONNECT';
export const SET_MESSAGES = 'SET_MESSAGES';
export const SET_INPUT_VALUE = 'SET_INPUT_VALUE';
export const SET_USERNAME = 'SET_USERNAME';
export const SET_USERNAME_ENTERED = 'SET_USERNAME_ENTERED';
export const SET_IS_ADMIN = 'SET_IS_ADMIN';
export const SET_CHAT_ROOM_ID = 'SET_CHAT_ROOM_ID';
export const SET_LOBBY_USERS = 'SET_LOBBY_USERS';
export const CREATE_CLIENT = 'CREATE_CLIENT';

export interface ConnectAction extends Action<typeof CONNECT> {
}

export interface DisconnectAction extends Action<typeof DISCONNECT> {
}

export interface SetMessagesAction extends Action<typeof SET_MESSAGES> {
    payload: string[];
}

export interface SetInputValueAction extends Action<typeof SET_INPUT_VALUE> {
    payload: string;
}

export interface SetUsernameAction extends Action<typeof SET_USERNAME> {
    payload: string;
}

export interface SetUsernameEnteredAction
    extends Action<typeof SET_USERNAME_ENTERED> {
    payload: boolean;
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

export interface CreateClientAction extends Action<typeof CREATE_CLIENT> {
    payload: Client | null;
}

export type ChatActionTypes =
    | ConnectAction
    | DisconnectAction
    | SetMessagesAction
    | SetInputValueAction
    | SetUsernameAction
    | SetUsernameEnteredAction
    | SetIsAdminAction
    | SetChatRoomIdAction
    | SetLobbyUsersAction
    | CreateClientAction;

export const connect = createAction(CONNECT);
export const disconnect = createAction(DISCONNECT);
export const setMessages = createAction<string[]>(SET_MESSAGES);
export const setInputValue = createAction<string>(SET_INPUT_VALUE);
export const setUsername = createAction<string>(SET_USERNAME);
export const setUsernameEntered = createAction<boolean>(SET_USERNAME_ENTERED);
export const setIsAdmin = createAction<boolean>(SET_IS_ADMIN);
export const setChatRoomId = createAction<string | null>(SET_CHAT_ROOM_ID);
export const setLobbyUsers = createAction<User[]>(SET_LOBBY_USERS);
export const createClient = createAction<Client>(CREATE_CLIENT);