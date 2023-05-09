import { User } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../../app/config/auth";
import { RootState } from "../../app/store";

interface InitialState {
    user: User & { token: string} | null;
    isAuth: boolean;
}

const initialState: InitialState = {
    user: null,
    isAuth: false,
};

const sliceAuth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        connect: () => initialState
    },
    extraReducers: (builder) => {
        builder.addMatcher(auth.endpoints.login.matchFulfilled, (state,action) => {
            state.user = action.payload;
            state.isAuth = true
          });
          builder.addMatcher(auth.endpoints.register.matchFulfilled, (state,action) => {
            state.user = action.payload;
            state.isAuth = true
          });
          builder.addMatcher(auth.endpoints.current.matchFulfilled, (state,action) => {
            state.user = action.payload;
            state.isAuth = true
          });
    }
})

export const {connect} = sliceAuth.actions


export default sliceAuth.reducer

export const selectIsAuthenticated = (state: RootState) => state.auth.isAuth;

export const selectUser = (state: RootState) => state.auth.user;