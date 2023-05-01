import React, {useEffect} from 'react';
import RoomCard from './RoomCard';
import './RoomsGrid.css';
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {selectRoom} from "../store/room/reducer";
import {fetchRooms, selectRoomById, setCurrentRoom} from "../store/room/actions";
import Header from "./utility/Header";
import CreateRoom from "./CreateRoomForm";
import {ChatRestControllerApi, JoinRoomRequest} from "../api";
import {selectUser} from "../store/user/reducer";
import {useWebSocket} from "../utils/WebSocketProvider";
import {ROOM_SUBSCRIPTION} from "../utils/webSocketDestinations";
import {useNavigate} from "react-router-dom";
import {ROOM_PATH} from "../utils/router";
import {shouldConnect} from "../store/websocket/actions";

const RoomsGrid: React.FC = () => {
    const dispatch = useAppDispatch();
    const {subscribe} = useWebSocket();
    const {rooms, currentRoom} = useAppSelector(selectRoom);
    const {user} = useAppSelector(selectUser)
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchRooms())
        const interval = setInterval(() => {
            dispatch(fetchRooms())
        }, 5000)
        return () => clearInterval(interval)
    }, [])

    const handleJoin = (event: React.MouseEvent<HTMLButtonElement>, roomId: string) => {
        event.preventDefault();
        const api = new ChatRestControllerApi();
        const joinRoomRequest: JoinRoomRequest = {
            userId: user?.id
        }
        api.joinRoom(roomId, joinRoomRequest)
            .then(() => {
                const room = rooms.find(room => room.id === roomId);
                if (room) dispatch(setCurrentRoom(room))
                else console.log(`Room with id ${roomId} not found. Cannot set current room.`)
                dispatch(shouldConnect())
                navigate(ROOM_PATH.replace(":roomId", roomId))
            })
            .catch(console.error);
    }

    return (
        <>
            <Header>Rooms</Header>
            <div className="create-room-container">
                <CreateRoom/>
            </div>
            <div className="rooms-grid">
                {rooms.map((room, index) => (
                    <RoomCard
                        key={index}
                        id={room.id}
                        imageSrc={'https://example.com/image1.jpg'}
                        name={room.name}
                        users={room.userCount}
                        maxUsers={10}
                        onJoin={handleJoin}
                    />
                ))}
            </div>
        </>
    );
}

export default RoomsGrid;