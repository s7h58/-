const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MongoDB 연결
mongoose.connect("mongodb://127.0.0.1:27017/myapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// ✅ User 스키마 & 모델
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  phone: String,
});

const User = mongoose.model("User", userSchema);

// ✅ 회원가입 API
app.post("/register", async (req, res) => {
  const { email, password, name, phone } = req.body;

  // 이메일 중복 체크
  const existUser = await User.findOne({ email });
  if (existUser) {
    return res.status(400).json({ message: "이미 가입된 이메일입니다." });
  }

  const newUser = new User({ email, password, name, phone });
  await newUser.save();
  res.json({ message: "회원가입 성공!" });
});

// ✅ 로그인 API
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });
  if (!user) {
    return res.status(401).json({ message: "이메일 또는 비밀번호가 틀렸습니다." });
  }

  res.json({ message: "로그인 성공!", user });
});

// ✅ 서버 실행
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
