import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { userState } from "./service.types";

const initialState: userState = {
    name: "",
    token: "",
    email: "",
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateUserData(state, action: PayloadAction<userState>) {
            Object.assign(state, action.payload);
        }                  
    }
})

export const { updateUserData } = userSlice.actions;

export default userSlice.reducer;
