import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./loginform.css";

const LoginForm = ({ onLogin }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // ✅ 로그인 처리 후 메인 페이지 이동s
    onLogin();
    navigate("/patients");
  };

  return (
    <div className="login-container">
      <h2 className="login-title">로그인</h2>
      <form onSubmit={handleLogin} className="login-form">
        <input type="text" placeholder="ID를 입력하세요" value={id} onChange={(e) => setId(e.target.value)} />
        <input type="password" placeholder="비밀번호를 입력하세요" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="login-button">로그인</button>
        <button type="button" className="signup-button" onClick={() => navigate("/signup")}>회원가입하기</button>
      </form>
    </div>
  );
};

export default LoginForm;
