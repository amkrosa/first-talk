import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import {chatReducer} from "./chat/reducer";

export const store = configureStore({
    reducer: {
        chat: chatReducer,
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