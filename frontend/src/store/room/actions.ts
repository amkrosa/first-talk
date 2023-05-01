import {Action} from 'redux';
import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import {Room, User} from "../../types/types";
import {ChatRestControllerApi} from "../../api";
import {RootState} from "../store";

export const SET_ROOMS = 'SET_ROOMS';
export const SET_CURRENT_ROOM = 'SET_CURRENT_ROOM'

export interface SetRoomsAction extends Action<typeof SET_ROOMS> {
    payload: Room[];
}

export const setRooms = createAction<Room[]>(SET_ROOMS);
export const setCurrentRoom = createAction<Room>(SET_CURRENT_ROOM);

export const fetchRooms = createAsyncThunk('rooms/get', async () => {
    const api = new ChatRestControllerApi();
    const response = await api.getRooms()
    return response.data
})

export const selectRoomById = (state: RootState, roomId: string) => state.room.rooms.find(room => room.id === roomId);
