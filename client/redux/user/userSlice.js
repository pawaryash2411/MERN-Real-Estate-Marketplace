import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser: null,
    loading: false,
    error: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signInRequest: (state) => {
            state.loading = true;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFail: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
        updateUserRequest: (state) => {
            state.loading = true;
        },
        updateUserSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        updateUserFail: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
        deleteUserRequest: (state) => {
            state.loading = true;
        },
        deleteUserSuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        deleteUserFail: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
        signOutUserRequest: (state) => {
            state.loading = true;
        },
        signOutUserSuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        signOutUserFail: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
    }
});

export const { signInRequest, signInSuccess, signInFail, updateUserRequest, updateUserSuccess, updateUserFail, deleteUserRequest, deleteUserSuccess, deleteUserFail, signOutUserRequest, signOutUserSuccess, signOutUserFail } = userSlice.actions;

export default userSlice.reducer;