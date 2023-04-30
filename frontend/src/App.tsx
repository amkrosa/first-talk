import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import WebSocketApp from "./components/WebSocketApp";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<WebSocketApp />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
