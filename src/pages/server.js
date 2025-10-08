import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { v4 as uuidv4 } from "uuid";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 가짜 DB (실제로는 MongoDB나 MySQL 사용)
const users = []; // [{ id, email, password, name, phone }]
const carts = {}; // { userId: [{productId, qty}, ...] }

// 회원가입
app.post("/register", (req, res) => {
  const { email, password, name, phone } = req.body;
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: "이미 존재하는 이메일입니다." });
  }
  const newUser = { id: uuidv4(), email, password, name, phone };
  users.push(newUser);
  res.json({ message: "회원가입 완료", user: newUser });
});

// 로그인
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(400).json({ message: "이메일 또는 비밀번호가 잘못되었습니다." });
  }
  res.json({ message: "로그인 성공", user });
});

// 장바구니 가져오기
app.get("/cart/:userId", (req, res) => {
  const { userId } = req.params;
  res.json(carts[userId] || []);
});

// 장바구니 저장
app.post("/cart/:userId", (req, res) => {
  const { userId } = req.params;
  const { items } = req.body;
  carts[userId] = items;
  res.json({ message: "장바구니 저장 완료" });
});

// 예: server.js
app.post("/register", (req, res) => {
  const { email, password, name, phone } = req.body;
  console.log(req.body); // ✅ 이걸로 값 제대로 오는지 확인
  res.json({ message: "회원가입 완료!" });
});


app.listen(5000, () => console.log("✅ Server on 5000"));
