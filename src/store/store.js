import { configureStore } from "@reduxjs/toolkit"
import { authSlice } from "../slices/auth.slices"
import { postsSlice } from "../slices/posts.slices"

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        posts: postsSlice.reducer
    }
})