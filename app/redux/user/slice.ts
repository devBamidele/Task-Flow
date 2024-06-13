import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserState } from "./service.types";
import { RootState } from "../store";

const initialState: UserState = {
    name: "",
    email: "",
    isOnline: false,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateUserData(state, action: PayloadAction<Partial<UserState>>) {
            Object.assign(state, action.payload);
        },

        isUserOnline(state, action: PayloadAction<boolean>) {
            state.isOnline = action.payload;
        },

        clearUserData(state){
            state.name = "";
            state.email = "";         
        },
    },
})

export const onlineState = (state: any) => {
    return state.user.isOnline;
};

export const { updateUserData, isUserOnline, clearUserData } = userSlice.actions;

export default userSlice.reducer;
