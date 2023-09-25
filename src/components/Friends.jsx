import { Navigate } from "react-router-dom"
import { Friend } from "./Friend"
import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RequestFriend } from "./RequestFriend";

export const Friends = ({redirect, isAllowed}) => {

   const refSearch = useRef();
   const user =  useSelector(state => state.auth)

   const [friends, setFriends] = useState([])
   const [requests, setRequests] = useState([])

   const getFriendRequests = async() => {
      const resp = await fetch(`http://localhost:8000/api/friends/friend-requests?user_id=${user.id}`)
      const data = await resp.json()
      setRequests(data.users)
   }

   useEffect(() => {
      if(user.id !== undefined) {
         getFriendRequests()
      }
   }, []);

   const handleSearchFriend = async() => {
      const search = refSearch.current.value
      if(!search) return
      
      const resp = await fetch(`http://localhost:8000/api/friends/search?username=${search}&user_id=${user.id}`)
      const data = await resp.json()
      setFriends(data.users)
   }

   if(!isAllowed) return <Navigate to={redirect} />   
   return (
      <>
      <div className="card my-5">
         <div className="card-header">
            <h2>Friends</h2>
         </div>
         <div className="card-body">
            <Friend user={user} friend={{}} />
         </div>
      </div>
      <hr />

      <div className="card my-5">
         <div className="card-header">
            <h2>Friend Requests</h2>
         </div>
         <div className="card-body">
            {
               requests.length === 0 ? 
               (
                  <p className="text-muted">No new requests</p>
               )
               :
               (
                  requests.map(request => <RequestFriend setRequests={setRequests} friend={request} key={request.id}/>)
               )
            }
         </div>
      </div>
      <hr />

      <div className="card my-5">
         <div className="card-header">
            <h2>Search Friends</h2>
         </div>
         <div className="card-body">
            <input type="text" className="form-control" ref={refSearch}/>
            <button className="btn btn-success my-2" onClick={handleSearchFriend}>Search</button>
            <hr />
            {friends.map(friend => <Friend user={user} key={friend.id} friend={friend}/>)}
         </div>
      </div>
        

      </>
   )
}