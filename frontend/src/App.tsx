import {BrowserRouter, Route, Routes} from "react-router-dom";
import WebSocketApp from "./components/WebSocketApp";
import Navbar from "./components/Navbar";
import "./App.css";
import {WebSocketProvider} from "./utils/WebSocketProvider";
import {useAppSelector} from "./store/hooks";
import {selectWebsocket} from "./store/websocket/reducer";
import {selectUser} from "./store/user/reducer";
import Room from "./components/Room";
import {ROOM_PATH} from "./utils/router";

const App: React.FC = () => {
    const {shouldConnect} = useAppSelector(selectWebsocket);
    const {token} = useAppSelector(selectUser);
    const webSocketUrl = "http://localhost:8080/ws";

    return (
        <div className="App">
            <WebSocketProvider url={webSocketUrl} token={token?.token ?? ""} shouldConnect={shouldConnect}>
                <BrowserRouter>
                    <Navbar isLoggedIn={false} currentRoom={null}/>
                    <div className="content">
                        <Routes>
                            <Route path="/" element={<WebSocketApp/>}/>
                            <Route path={ROOM_PATH} element={<Room/>}/>
                        </Routes>
                    </div>
                </BrowserRouter>
            </WebSocketProvider>
        </div>
    );
};

export default App;
