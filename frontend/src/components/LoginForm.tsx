import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    setUsername as setUsernameAction,
    setIsAdmin as setIsAdminAction,
    setUsernameEntered
} from '../store/chat/actions';
import './LoginForm.css'
import {TOPICS} from "../static/topics";
import {Client} from "stompjs";

const interestsList = ['Interest1', 'Interest2', 'Interest3'];

interface LoginFormProps {
    client: Client
}

const LoginForm: React.FC<LoginFormProps> = ({client}) => {
    const dispatch = useDispatch();
    const [formType, setFormType] = useState<'login' | 'guest' | null>(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [interests, setInterests] = useState<Array<string>>([]);
    const [isAdmin, setIsAdmin] = useState(false);

    const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (username.trim()) {
            dispatch(setUsernameAction(username.trim()));
            dispatch(setIsAdminAction(isAdmin));
            dispatch(setUsernameEntered(true))
            client.send('/app/lobby/join', {}, JSON.stringify({username, isAdmin}));
            // Implement any additional logic needed upon successful login
        }
    };

    const toggleInterest = (interest: string) => {
        if (interests.includes(interest)) {
            setInterests(interests.filter(i => i !== interest));
        } else {
            setInterests([...interests, interest]);
        }
    };

    return (
        <div className="login-form-container">
            {!formType && (
                <div>
                    <button onClick={() => setFormType('login')}>Login</button>
                    <button onClick={() => setFormType('guest')}>Guest</button>
                </div>
            )}
            {formType === 'login' && (
                <form>
                    <h2>Login</h2>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Enter your email"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Enter your password"
                    />
                    <button type="submit" onClick={handleLogin}>
                        Login
                    </button>
                </form>
            )}
            {formType === 'guest' && (
                <form>
                    <h2>Guest</h2>
                    <input
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        placeholder="Enter your username"
                    />
                    <div>
                        {TOPICS.topics.map(interest => (
                            <div key={interest.name}>
                                <input
                                    type="checkbox"
                                    id={`interest-${interest}`}
                                    checked={interests.includes(interest.name)}
                                    onChange={() => toggleInterest(interest.name)}
                                />
                                <label htmlFor={`interest-${interest.name}`}>{interest.name}</label>
                            </div>
                        ))}
                    </div>
                    <input
                        type="checkbox"
                        id="admin"
                        onChange={e => setIsAdmin(e.target.checked)}
                    />
                    <label htmlFor="admin">Admin</label>
                    <button type="submit" onClick={handleLogin}>
                        Login
                    </button>
                </form>
            )}
        </div>
    );
};

export default LoginForm;