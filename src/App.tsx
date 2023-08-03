import { Routes } from "react-router-dom";
import { Route } from "react-router";
import Home from "./pages/Home";

function App() {
// practice/
    return (
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
    );
}

export default App;
