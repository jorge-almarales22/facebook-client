import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
        email: null,
        name: null,
        id: null
    },
    reducers: {
        sigin: (state, { payload } ) => {
            const { token, email, name, id } = payload
            state.token = token
            state.email = email
            state.name = name
            state.id = id
        },
    }
});

export const { sigin } = authSlice.actions;
