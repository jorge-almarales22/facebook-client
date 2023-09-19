import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
        email: null,
        name: null
    },
    reducers: {
        sigin: (state, { payload } ) => {
            const { token, email, name } = payload
            state.token = token
            state.email = email
            state.name = name
        },
    }
});

export const { sigin } = authSlice.actions;
