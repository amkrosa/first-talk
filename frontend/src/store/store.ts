import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import {chatReducer} from "./chat/reducer";
import {userReducer} from "./user/reducer";
import {roomReducer} from "./room/reducer";
import {websocketReducer} from "./websocket/reducer";

export const store = configureStore({
    reducer: {
        chat: chatReducer,
        user: userReducer,
        room: roomReducer,
        websocket: websocketReducer,
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;