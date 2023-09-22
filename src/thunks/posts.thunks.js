import { createPosts } from "../slices/posts.slices";


export const getAllPostsThunk = (id) => {
    return async (dispatch, getState) => {

        // console.log("get state thunk", getState())
        const resp = await fetch(`http://localhost:8000/api/posts/get-all-posts/${id}`);
        const data = await resp.json();
        // console.log("data", data)
        if(data){
            dispatch(createPosts(data))
            // console.log("entreee")
            
        }else{
            
        }
        
        
    }
}