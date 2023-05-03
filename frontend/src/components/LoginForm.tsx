import React, {useState} from 'react';
import './LoginForm.css'
import {TOPICS} from "../static/topics";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {selectUser} from "../store/user/reducer";
import {UserRestControllerApi} from "../api";
import {setLoggedIn, setToken, setUser} from "../store/user/actions";
import {Token, User} from "../types/types";
import Header from "./utility/Header";

const interestsList = ['Interest1', 'Interest2', 'Interest3'];

const LoginForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const {loggedIn, user, token} = useAppSelector(selectUser)
    const [formType, setFormType] = useState<'login' | 'guest' | null>(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [interests, setInterests] = useState<Array<string>>([]);
    const [isAdmin, setIsAdmin] = useState(false);

    const userApi = new UserRestControllerApi();

    const handleGuestLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (username.trim()) {
            const registerRequest = {name: username}
            userApi.registerGuestUser(registerRequest)
                .then(response => {
                    const data = response.data;
                    const user: User = {
                        id: data.id,
                        username: data.name,
                    };
                    dispatch(setUser(user));

                    const token: Token = {
                        token: data.auth.jwt,
                        expirationDate: data.auth.expiration
                    }
                    dispatch(setToken(token));
                    dispatch(setLoggedIn(true));
                    localStorage.setItem("token", token.token)
                    localStorage.setItem("tokenExpiration", token.expirationDate)

                    return response;
                })
                .catch(console.error)
        }
    };

    const handleUserLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (email.trim() && password.trim()) {
            //todo
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
        <>
            <Header>Login</Header>
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
                        <button type="submit" onClick={handleUserLogin}>
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
                        <button type="submit" onClick={handleGuestLogin}>
                            Login
                        </button>
                    </form>
                )}
            </div>
        </>
    );
};

export default LoginForm;