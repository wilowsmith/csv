import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.scss";
import Main from "./components/Main";
import NotFound from "./components/NotFound";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" exact element={<Main />} />
                <Route path="/csv" exact element={<Main />}>
                    <Route path=":studentNumber" element={<Main />}>
                        <Route path=":mapId" element={<Main />} />
                    </Route>
                </Route>
                <Route path="/notFound" exact element={<NotFound />} />
                <Route default element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default App;
