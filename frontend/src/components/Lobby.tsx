import React from 'react';
import {useAppSelector} from "../store/hooks";
import {selectChat} from "../store/chat/reducer";
import {User} from "../types/types";
import {TOPICS} from "../static/topics";

interface LobbyProps {
    onSplit: () => void
}

const Lobby: React.FC<LobbyProps> = ({onSplit: handleSplit}) => {
    const {lobbyUsers, isAdmin} = useAppSelector(selectChat);
    const getInterestColor = (interest: string) => {
        const topic = TOPICS.topics.find((topic) => topic.name === interest);
        return topic ? topic.color : '#000';
    };

    return (
        <div className="lobby-container">
            <h2>Lobby</h2>
            <ul className="users-list">
                {lobbyUsers.map((user: User, i: number) => (
                    <li key={i}>
                        {user.name}
                        {isAdmin && <button className="kick-btn">Kick</button>}
                        <div className="interests">
                            {user.interests.map((interest, index) => (
                                <span
                                    key={index}
                                    className="interest"
                                    style={{backgroundColor: getInterestColor(interest)}}
                                >
                  {interest}
                </span>
                            ))}
                        </div>
                    </li>
                ))}
            </ul>
            {isAdmin && (
                <button onClick={handleSplit}>Split</button>
            )}
        </div>
    );
};

export default Lobby;