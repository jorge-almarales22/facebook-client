import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import socketIOClient from 'socket.io-client';

export const RequestFriend = ({friend, setRequests}) => {

    let socket = null;

    const user = useSelector((state) => state.auth);

    useEffect(() => {

        socket = socketIOClient('http://localhost:8000'); 

        return () => {
            socket.disconnect(); // Desconectar el socket cuando el componente se desmonte
        };

    }, []);

    const handleSendRequest = async() => {

        socket = socketIOClient('http://localhost:8000');

        const data = {
            // usuario authenticado
            user_id: user.id,
            // id de la persona que quiere ser tu amigo
            friend_id: friend.id
        }

        socket.emit('accept-request', data, async(payload) => {
            
            const resp = await fetch(`http://localhost:8000/api/friends/friend-requests?user_id=${user.id}`)
            const users = await resp.json()
            setRequests(users.users)
        });
        

        console.log("Request Accepted")
    }

    const handleDestroyRequest = async() => {
        // setRequest(false)
        console.log("Request Destroyed")
    }

    return (
        <div className="card my-2">
            <div className="card-header">
                <p className="text-muted"><span className="fw-bold">{friend.name}</span> has sent you a friend request</p>
            </div>
            <div className="card-body">
                <button className="btn btn-primary" onClick={handleSendRequest}>Confirm</button>
                <button className="btn btn-danger mx-2" onClick={handleDestroyRequest}>Delete</button>
            </div>
        </div>
    )
}