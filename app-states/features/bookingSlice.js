import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    book_details: {
        id: null,
        status: null,
        request_time: null,
        schedule_time: null,
        schedule_date: null,
        address: null,
        latitude: null,
        longitude: null,
        user: null,
        service: null
    },

    book_rating_info: {
        id: null,
        title: null,
        user: null,
    },

    rating:{
        isRating: false
    },

    click: {
        value: false,
    },
}

export const bookingSlice = createSlice({
    name: 'bookings',
    initialState,
    reducers:{
        saveBookDetails: (state, action) => {
            state.book_details = action.payload
        },
        undo: (state) => {
            state.book_details = initialState.book_details
        },
        done_rate: (state, action) => {
            state.rating.isRating = action.payload
        },

        refreshes: (state, action) => {
            state.click.value = action.payload
        },

        service_info: (state, action) => {
            state.book_rating_info = action.payload
        }

    }
});


export const {saveBookDetails, undo, done_rate, refreshes, service_info} = bookingSlice.actions;

export default bookingSlice.reducer;