import {createReducer} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {Token, User} from "../../types/types";
import {setLoggedIn, setToken, setUser} from "./actions";

interface UserState {
    loggedIn: boolean,
    user: User | null,
    token: Token | null
}

const initialState: UserState = {
    loggedIn: false,
    user: null,
    token: null,
};

export const userReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(setUser, (state, action) => {
            state.user = action.payload;
        })
        .addCase(setToken, (state, action) => {
            state.token = action.payload;
        })
        .addCase(setLoggedIn, (state, action) => {
            state.loggedIn = action.payload;
        })
});

export const selectUser = (state: RootState) => state.user;