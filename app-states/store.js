import {configureStore} from "@reduxjs/toolkit";
import userReducer from './features/userSlice';
import bookingReducer from "./features/bookingSlice";

export const store = configureStore({
    reducer:{
        user: userReducer,
        booking: bookingReducer
    }
})