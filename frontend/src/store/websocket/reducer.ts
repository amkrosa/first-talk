import {createReducer} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {connect, disconnect, shouldConnect, shouldNotConnect} from "./actions";

interface WebsocketState {
    connected: boolean;
    shouldConnect: boolean;
}

const initialState: WebsocketState = {
    connected: false,
    shouldConnect: false,
};

export const websocketReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(connect, (state, action) => {
            state.connected = true;
        })
        .addCase(disconnect, (state, action) => {
            state.connected = false;
        })
        .addCase(shouldConnect, (state, action) => {
            state.shouldConnect = true;
        })
        .addCase(shouldNotConnect, (state, action) => {
            state.shouldConnect = false;
        })
});

export const selectWebsocket = (state: RootState) => state.websocket;