import { useDispatch } from "react-redux"
import { signinThunk } from "../thunks/auth.thunks"
import { useRef } from "react";
import { Navigate } from "react-router-dom";

export const Login = ({redirect, isAllowed}) => {

    
    const dispatch = useDispatch();
    const refEmail = useRef();
    const refPassword = useRef();
    const errorRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault()
        const email = refEmail.current.value
        const password = refPassword.current.value
        
        if(!email || !password) {
            errorRef.current.classList.remove("d-none")
            return
        }
        
        dispatch(signinThunk(email, password))

        return <Navigate to="/home" />
    }

    if(isAllowed) return <Navigate to={redirect} />
    
   return (
      <form className="card my-5" method="POST" onSubmit={handleSubmit}>
        <div className="card-header">
            Login
        </div>
        <div className="card-body">
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input ref={refEmail} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                <small ref={errorRef} id="emailHelp" className="form-text text-danger d-none">Please enter a valid email and password.</small>
            </div>

            <div className="form-group my-2">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input ref={refPassword} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
            </div>

            <button type="submit" className="btn btn-primary my-2 text-center">Submit</button>
        </div>
        
      </form>
   )
}