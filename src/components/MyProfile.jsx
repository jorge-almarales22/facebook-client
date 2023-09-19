import { Navigate } from "react-router-dom"

export const MyProfile = ({redirect, isAllowed}) => {
   if(!isAllowed) return <Navigate to={redirect} />
   return (
      <>
        <h1>My Profile</h1>
      </>
   )
}