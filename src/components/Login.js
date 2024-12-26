import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";
import "../css/Login.css";

function Login({ setToken }) {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(loginId, password);
      const token = response.data.object.token;

      setToken(token);
      localStorage.setItem("jwt", token);
      alert("로그인 성공!");

      navigate("/main");
    } catch (error) {
      alert("틀렸습니다! 다시 써주세요!");
      console.error(error);
    }
  };

  return (
    <div id="Login_container">
      <form id="Login_form" onSubmit={loginSubmit}>
        <h1 id="Login_title">Login</h1>
        <input
          id="Login_id"
          type="text"
          placeholder="ID"
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
        />
        <input
          id="Login_password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button id="Login_button" type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
