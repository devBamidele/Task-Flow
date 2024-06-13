import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthState } from "./service.types";

const initialState: AuthState = {
    token: "",
    refresh: "",
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        updateTokens(state, action: PayloadAction<Partial<AuthState>>) {
            Object.assign(state, action.payload)
        },

        loggedOut(state){
            state.token = "";
            state.refresh = "";
        }
    },

})

export const isLoggedIn = (state: any) => {
    return state.auth.token != null && state.auth.token.length !== 0;
};

export const { updateTokens, loggedOut } = authSlice.actions;

export default authSlice.reducer;