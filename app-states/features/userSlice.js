import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    islogged: false,
    user: {
        id: null,
        email:"",
        fullname: "",
        created_at: "",
        profile_image: null,
    },
    user_address: {
        address_id: null,
        address_name: "",
    },
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{

        saveUser: (state, action) => {
            state.user = action.payload
        },

        saveAddress: (state, action) => {
            state.user_address = action.payload
        },

        login: (state, action) => {
            state.islogged = true;
            state.user = action.payload
        },

        register: (state, action) =>{
            state.islogged = false,
            state.user = action.payload
        },

        logout: (state) => {
            state.islogged = false,
            state.user = initialState.user,
            state.user_address = initialState.user_address
        }

    }

});


export const {login, logout, register, saveAddress, saveUser} = userSlice.actions;

export default userSlice.reducer;