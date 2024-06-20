import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserState } from "./service.types";
import { RootState } from "../store";
import { loggedOut } from "../auth/slice";

const initialState: UserState = {
    name: "",
    email: "",
    isOnline: false,
}

const resetUserData = (state: UserState) => {
    state.name = "";
    state.email = "";
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateUserData: (state, action: PayloadAction<Partial<UserState>>) => {
            Object.assign(state, action.payload);
        },

        isUserOnline: (state, action: PayloadAction<boolean>) => {
            state.isOnline = action.payload;
        },

        clearUserData: resetUserData,
    },

    extraReducers: (builder) => {
        builder.addCase(loggedOut, resetUserData);
    }
})

export const onlineState = (state: any) => {
    return state.user.isOnline;
};

export const { updateUserData, isUserOnline, clearUserData } = userSlice.actions;

export default userSlice.reducer;
