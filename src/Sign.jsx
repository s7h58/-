import React, { useState } from "react";
import './App.css';

export default function Register() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleRegister = async () => {
    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: pw, name, phone }),
      });
      const data = await res.json();
      alert(data.message);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="">
      <h2>회원가입</h2>
      <input type="text" placeholder="이메일" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="비밀번호" onChange={(e) => setPw(e.target.value)} />
      <input type="text" placeholder="이름" onChange={(e) => setName(e.target.value)} />
      <input type="text" placeholder="전화번호" onChange={(e) => setPhone(e.target.value)} />
      <button onClick={handleRegister}>회원가입</button>
    </div>
  );
}
