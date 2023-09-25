import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

export const Notification = ({redirect, isAllowed}) => {

   const [notifications, setNotifications] = useState([])

   const user = useSelector(state => state.auth)

   const getNotifications = async () => {
       const resp = await fetch(`http://localhost:8000/api/notifications?user_id=${user.id}`)
       const data = await resp.json()
       setNotifications(data)
   }

   useEffect(() => {
        getNotifications()
   }, [])
   if(!isAllowed) return <Navigate to={redirect} />   
   
   return (
      <div className="card my-5">
        <div className="card-header">
          <h2>Notifications</h2>
        </div>
        <div className="card-body">
            {
                notifications.length === 0 ?
                (
                    <p className="text-muted">No new notifications</p>
                ) :
                (
                    notifications.map((notification, index) => (
                        <p className="text-muted" key={index}>{notification.message}</p>
                    ))
                )
            }
        </div>
      </div>
   )
}