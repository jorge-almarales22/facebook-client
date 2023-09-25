import { useEffect, useState } from "react"
import socketIOClient from 'socket.io-client';

export const Friend = ({friend, user}) => {

    let socket = null;

    useEffect(() => {

        socket = socketIOClient('http://localhost:8000'); 

        return () => {
            socket.disconnect(); // Desconectar el socket cuando el componente se desmonte
        };

    }, []);

    const [request, setRequest] = useState('Friend Request Sent')

    const handleSendRequest = async() => {

        const data = {
            user_id: user.id,
            friend_id: friend.id
        }

        socket.emit('send-request', data);

        // setRequest('Cancel Request')
    }

    const handleCancelRequest = async() => {
        setRequest('Friend Request Sent')
    }
    return (
        <div className="card my-2">
            <div className="card-header">
                {friend.name}
            </div>
            <div className="card-body">
                {
                    request == 'Friend Request Sent' ? (

                        <button className="btn btn-success" onClick={handleSendRequest}>Send Request</button>
                    ) : 
                    (
                        <button className="btn btn-danger" onClick={handleCancelRequest}>Cancel Request</button>
                    ) 
                }
            </div>
        </div>
    )
}