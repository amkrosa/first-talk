import {createReducer} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {Room} from "../../types/types";
import {fetchRooms, setCurrentRoom, setRooms} from "./actions";

interface RoomState {
    rooms: Room[]
    currentRoom: Room | null
}

const initialState: RoomState = {
    rooms: [],
    currentRoom: null,
};

export const roomReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(setRooms, (state, action) => {
            state.rooms = action.payload;
        })
        .addCase(setCurrentRoom, (state, action) => {
            state.currentRoom = action.payload;
        })
        .addCase(fetchRooms.fulfilled, (state, action) => {
            state.rooms = action.payload.rooms.map(room => ({
                id: room.roomId,
                name: room.name,
                userCount: room.userCount,
                inProgress: room.inProgress
            }));

        })
});

export const selectRoom = (state: RootState) => state.room;
