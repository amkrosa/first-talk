import React, {useState} from 'react';
import './CreateRoomForm.css';
import {ChatRestControllerApi, CreateRoomRequest} from "../api";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {selectUser} from "../store/user/reducer";
import {selectRoom} from "../store/room/reducer";
import {setRooms} from "../store/room/actions";
import {throws} from "assert";

const CreateRoom: React.FC = () => {
    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [maxUsers, setMaxUsers] = useState('');
    const dispatch = useAppDispatch();
    const {user} = useAppSelector(selectUser);
    const {rooms, currentRoom} = useAppSelector(selectRoom);
    const api = new ChatRestControllerApi();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const createRoomRequest: CreateRoomRequest = {
            name: name,
            userId: user?.id
        }

        api.createRoom(createRoomRequest)
            .catch(console.error)
            .then((response) => {
                if (response) {
                    const roomId = response.data.roomId;
                    dispatch(setRooms([...rooms, {
                        id: roomId,
                        name: name,
                        userCount: 0,
                        maxUserCount: parseInt(maxUsers),
                        inProgress: false
                    }]))
                }
            })
            .finally(() => setShowForm(false))
    };

    return (
        <div className="create-room">
            <button className="create-room-btn" onClick={() => setShowForm(!showForm)}>
                +
            </button>
            {showForm && (
                <div className="create-room-form-overlay">
                    <form className="create-room-form" onSubmit={handleSubmit}>
                        <h2>Create Room</h2>
                        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
                        <input type="text" placeholder="Image URL" value={imageUrl}
                               onChange={(e) => setImageUrl(e.target.value)}/>
                        <input type="number" placeholder="Max Users" value={maxUsers}
                               onChange={(e) => setMaxUsers(e.target.value)}/>
                        <button type="submit">Create</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default CreateRoom;