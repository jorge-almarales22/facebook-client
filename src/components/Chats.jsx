import { Navigate } from "react-router-dom"

export const Chats = ({redirect, isAllowed}) => {

   if(!isAllowed) return <Navigate to={redirect} />
   return (
      <>
        <h1>Chats</h1>
      </>
   )
}