import { Route, Routes } from "react-router-dom"
import { Navbar } from "./components/Navbar"
import { Login } from "./components/Login"
import { Chats } from "./components/Chats"
import { Home } from "./components/Home"
import { Friends } from "./components/Friends"
import { MyProfile } from "./components/MyProfile"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { sigin } from "./slices/auth.slices"

export const App = () => {
    
    useEffect(() => {
        const authUser = JSON.parse(localStorage.getItem('authUser'))
        
        if(authUser !== null) dispatch(sigin(authUser))
    }, [])

    const auth = useSelector(state => state.auth.token)   
    const dispatch = useDispatch()

    console.log(auth)

   return (
      <div className="container">
        <Navbar/>

        <Routes>
            <Route path="/" element={<Login redirect="/home" isAllowed={!!auth}/>}/>

            <Route path="/home" element={<Home redirect="/" isAllowed={!!auth}/>}/>
            <Route path="/chats" element={<Chats redirect="/" isAllowed={!!auth}/>}/>
            <Route path="/friends" element={<Friends redirect="/" isAllowed={!!auth}/>}/>
            <Route path="/my-profile" element={<MyProfile redirect="/" isAllowed={!!auth}/>}/>
        </Routes>
      </div>
   )
}