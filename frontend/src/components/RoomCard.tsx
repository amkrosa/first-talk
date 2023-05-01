import React from 'react';
import './RoomCard.css';

interface RoomCardProps {
    id: string,
    imageSrc: string;
    name: string;
    users: number;
    maxUsers: number;
    isActive?: boolean;
    onJoin: (event: React.MouseEvent<HTMLButtonElement>, id: string) => void;
}

const RoomCard: React.FC<RoomCardProps> = ({id, imageSrc, name, users, maxUsers, isActive = true, onJoin}) => {
    const cardClassName = `room-card${isActive ? '' : ' inactive'}`;
    const joinButtonClassName = `room-card-join${isActive ? '' : ' inactive'}`;

    return (
        <div className={cardClassName}>
            <div className="room-card-image">
                <img src={imageSrc} alt={`${name} room`}/>
            </div>
            <div className="room-card-info">
                <h3>{name}</h3>
                <p>Users: {users}/{maxUsers}</p>
            </div>
            <button className={joinButtonClassName} onClick={e => onJoin(e, id)}>{isActive ? 'Join' : 'In progress'}</button>
        </div>
    );
}

export default RoomCard;