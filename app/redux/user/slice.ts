import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserState } from "./service.types";

const initialState: UserState = {
    name: "",
    email: "",
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateUserData(state, action: PayloadAction<Partial<UserState>>) {
            Object.assign(state, action.payload);
        }
    }
})

export const { updateUserData } = userSlice.actions;

export default userSlice.reducer;
