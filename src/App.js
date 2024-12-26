import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Main from "./components/Main";
import Dispatch from "./components/Dispatch";

function App() {
  const [token, setToken] = useState(localStorage.getItem("jwt"));

  return (
    <Router>
      <Routes>
        {/* 로그인 */}
        <Route
          path="/"
          element={<Login setToken={setToken} />}
        />
        
        {/* 메인 페이지 */}
        <Route path="/main" element={<Main token={token} />} />

        {/* 배차일보 페이지 */}
        <Route path="/dispatch" element={<Dispatch token={token} />} />
      </Routes>
    </Router>
  );
}

export default App;
