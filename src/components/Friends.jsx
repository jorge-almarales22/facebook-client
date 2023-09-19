import { Navigate } from "react-router-dom"

export const Friends = ({redirect, isAllowed}) => {

   if(!isAllowed) return <Navigate to={redirect} />   
   return (
      <>
        <h1>Friends</h1>
      </>
   )
}