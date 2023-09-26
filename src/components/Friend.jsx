import { useState } from "react"
import { useSockect } from "./useSockect";

export const Friend = ({friend, user, weAreFriends}) => {

    const { socket } = useSockect();

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
                    !weAreFriends && (

                        request == 'Friend Request Sent' ? (

                            <button className="btn btn-success" onClick={handleSendRequest}>Send Request</button>
                        ) : 
                        (
                            <button className="btn btn-danger" onClick={handleCancelRequest}>Cancel Request</button>
                        ) 
                    )
                }
                { 
                    weAreFriends && (
                        <>
                            <button className="btn btn-primary btn-sm" >Send a message</button>
                            <button className="btn btn-danger mx-2 btn-sm" >Delete Friend</button>
                        </>
                    )
                }
            </div>
        </div>
    )
}