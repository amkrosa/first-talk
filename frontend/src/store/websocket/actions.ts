import {Action} from "redux";
import {createAction} from "@reduxjs/toolkit";

export const CONNECT = 'CONNECT';
export const DISCONNECT = 'DISCONNECT';
export const SHOULD_CONNECT = 'SHOULD_CONNECT'
export const SHOULD_NOT_CONNECT = 'SHOULD_NOT_CONNECT'


export interface ConnectAction extends Action<typeof CONNECT> {
}

export interface DisconnectAction extends Action<typeof DISCONNECT> {
}

export interface ShouldConnectAction extends Action<typeof SHOULD_CONNECT> {
}

export interface ShouldNotConnectAction extends Action<typeof SHOULD_NOT_CONNECT> {
}

export const connect = createAction(CONNECT);
export const disconnect = createAction(DISCONNECT);
export const shouldConnect = createAction(SHOULD_CONNECT);
export const shouldNotConnect = createAction(SHOULD_NOT_CONNECT);