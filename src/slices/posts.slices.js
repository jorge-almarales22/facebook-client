import { createSlice } from '@reduxjs/toolkit';

export const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        allPosts: []
    },
    reducers: {
        createPosts: (state, { payload } ) => {
            const { posts } = payload
            state.allPosts = posts;

        },
    }
});

export const { createPosts } = postsSlice.actions;