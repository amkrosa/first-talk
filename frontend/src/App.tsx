import {BrowserRouter, Route, Routes} from "react-router-dom";
import WebSocketApp from "./components/WebSocketApp";
import Navbar from "./components/Navbar";
import "./App.css";
import {WebSocketProvider} from "./utils/WebSocketProvider";
import {useAppSelector} from "./store/hooks";
import {selectWebsocket} from "./store/websocket/reducer";
import {selectUser} from "./store/user/reducer";
import MainRoom from "./components/MainRoom";
import {BREAKOUT_ROOM_PATH, ROOM_PATH} from "./utils/router";
import BreakoutRoom from "./components/BreakoutRoom";

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
                            <Route path={ROOM_PATH} element={<MainRoom/>}/>
                            <Route path={BREAKOUT_ROOM_PATH} element={<BreakoutRoom/>}/>
                        </Routes>
                    </div>
                </BrowserRouter>
            </WebSocketProvider>
        </div>
    );
};

export default App;
