import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { userState } from "./service.types";
import { RootState } from "../store";

const initialState: userState = {
    name: "",
    token: "",
    email: "",
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateUserData(state, action: PayloadAction<Partial<userState>>) {
            Object.assign(state, action.payload);
        }
    }
})

export const isLoggedIn = (state: RootState) => {
    return state.user.token != null && state.user.token.length !== 0;
};

export const { updateUserData } = userSlice.actions;

export default userSlice.reducer;
