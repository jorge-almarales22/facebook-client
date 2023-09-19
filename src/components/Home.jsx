import { Navigate } from "react-router-dom"

export const Home = ({redirect, isAllowed}) => {
   
   if(!isAllowed) return <Navigate to={redirect} />

   return (
      <>
        <h1>Home</h1>
      </>
   )
}