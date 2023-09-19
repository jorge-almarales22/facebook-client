import { sigin } from "../slices/auth.slices"

export const signinThunk = (email, password) => {
    return async (dispatch) => {
        const resp = await fetch(`http://localhost:8000/api/auth/sign-in`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        const data = await resp.json()
        
        dispatch(sigin(data))

        localStorage.setItem('authUser', JSON.stringify(data))
        
    }
}