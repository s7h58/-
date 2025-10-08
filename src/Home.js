import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: pw }),
      });
      const data = await res.json();
      alert(data.message);

      if (res.ok) {
        // ✅ 로그인 성공 시 사용자 정보 저장
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/"); // Home 이동
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">로그인</h2>
        <input
          type="text"
          placeholder="이메일 입력"
          className="auth-input"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호 입력"
          className="auth-input"
          onChange={(e) => setPw(e.target.value)}
        />
        <button className="auth-button" onClick={handleLogin}>
          로그인
        </button>
      </div>
    </div>
  );
}
