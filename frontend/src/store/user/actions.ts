import {Action} from "redux";
import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import {Token, User} from "../../types/types";
import {UserRestControllerApi} from "../../api";

export const SET_USER = 'SET_USER';
export const SET_LOGGED_IN = 'SET_LOGGED_IN';
export const SET_TOKEN = 'SET_TOKEN';

export interface SetUserAction extends Action<typeof SET_USER> {
    payload: {
        username: string,
        email: string,
        id: string,
    }
}

export interface SetLoggedInAction extends Action<typeof SET_LOGGED_IN> {
    payload: boolean
}

export interface SetTokenAction extends Action<typeof SET_TOKEN> {
    payload: {
        token: string,
        expirationDate: Date
    }
}

export type UserActionTypes =
    | SetUserAction
    | SetLoggedInAction
    | SetTokenAction;

export const setUser = createAction<User>(SET_USER);
export const setLoggedIn = createAction<boolean>(SET_LOGGED_IN);
export const setToken = createAction<Token>(SET_TOKEN);