import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: pw, name, phone }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("회원가입이 완료되었습니다! 로그인해주세요.");
        navigate("/login");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("회원가입 오류:", err);
      alert("회원가입 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">회원가입</h2>
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
        <input
          type="text"
          placeholder="이름 입력"
          className="auth-input"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="전화번호 입력"
          className="auth-input"
          onChange={(e) => setPhone(e.target.value)}
        />
        <button className="auth-button" onClick={handleRegister}>
          회원가입
        </button>
      </div>
    </div>
  );
}
