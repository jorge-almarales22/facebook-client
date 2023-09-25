import { useEffect, useState } from "react"
import socketIOClient from 'socket.io-client';

export const RequestFriend = ({user}) => {

    let socket = null;

    useEffect(() => {

        socket = socketIOClient('http://localhost:8000'); 

        return () => {
            socket.disconnect(); // Desconectar el socket cuando el componente se desmonte
        };

    }, []);

    const [request, setRequest] = useState(true)

    const handleSendRequest = async() => {

        // const data = {
        //     user_id: user.id,
        //     friend_id: friend.id
        // }

        // socket.emit('send-request', data);

        // setRequest('Cancel Request')

        console.log("Request Accepted")
    }

    const handleDestroyRequest = async() => {
        // setRequest(false)
        console.log("Request Destroyed")
    }

    return (
        <div className="card my-2">
            <div className="card-header">
                <p className="text-muted"><span className="fw-bold">{user.name}</span> has sent you a friend request</p>
            </div>
            <div className="card-body">
                <button className="btn btn-primary" onClick={handleSendRequest}>Confirm</button>
                <button className="btn btn-danger mx-2" onClick={handleDestroyRequest}>Delete</button>
            </div>
        </div>
    )
}