import { Navigate } from "react-router-dom"
import { Friend } from "./Friend"
import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RequestFriend } from "./RequestFriend";
import { useSockect } from "./useSockect";
import { Alert } from "./Alert";

export const Friends = ({redirect, isAllowed}) => {

   const refSearch = useRef();

   const {user} = useSockect();

   const [friends, setFriends] = useState([])
   const [foundFriends, setFoundFriends] = useState([])
   const [requests, setRequests] = useState([])

   const getFriends = async() => {
      const resp = await fetch(`http://localhost:8000/api/friends?user_id=${user.id}`)
      const data = await resp.json()
      setFriends(data.users)
   }

   const getFriendRequests = async() => {
      const resp = await fetch(`http://localhost:8000/api/friends/friend-requests?user_id=${user.id}`)
      const data = await resp.json()
      setRequests(data.users)
   }

   useEffect(() => {
      if(user.id !== undefined) {
         getFriendRequests()
         getFriends()
      }
   }, []);

   const handleSearchFriend = async() => {
      const search = refSearch.current.value
      if(!search) return
      
      const resp = await fetch(`http://localhost:8000/api/friends/search?username=${search}&user_id=${user.id}`)
      const data = await resp.json()
      setFoundFriends(data.users)
   }

   if(!isAllowed) return <Navigate to={redirect} />   
   return (
      <>
      <Alert/>

      <div className="card my-5">
         <div className="card-header">
            <h2>Your Friends</h2>
         </div>
         <div className="card-body">
            {
               friends.length === 0 ?
               (
                  <p className="text-muted">No friends</p>
               )
               :
               (
                  friends.map(friend => <Friend weAreFriends={true} user={user} friend={friend} key={friend.id}/>)
               )
            }
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
            <div className="d-flex align-items-center justify-content-between">
               <input type="text" className="form-control" ref={refSearch}/>
               <button className="btn btn-success my-2" onClick={handleSearchFriend}>Search</button>
            </div>
            <hr />
            {foundFriends.map(friend => <Friend weAreFriends={false} user={user} key={friend.id} friend={friend}/>)}
         </div>
      </div>
        

      </>
   )
}