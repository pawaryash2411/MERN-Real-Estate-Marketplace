import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    listing: {},
    loading: false,
    error: null
}

const listingSlice = createSlice({
    name: "listing",
    initialState,
    reducers: {
        createListingRequest: (state) => {
            state.loading = true;
        },
        createListingSuccess: (state, action) => {
            state.listing = action.payload;
            state.loading = false;
            state.error = null;
        },
        createListingFail: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
    }
});

export const { createListingRequest, createListingSuccess, createListingFail, } = listingSlice.actions;

export default listingSlice.reducer;