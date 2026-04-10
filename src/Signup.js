import React, { useState } from "react";

// onBackToLogin: 가입 성공 후 로그인 창으로 보내주기 위한 선물이에요!
function Signup({ onBackToLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    const url = "http://localhost:8080/api/users/signup";
    const userData = {
      name: name,
      email: email,
      password: password,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const result = await response.text();

      // 회원가입 성공 시 알림 띄우고 로그인 화면으로 보내기
      alert(result);
      if (response.ok) {
        onBackToLogin(); // 👈 App.js에서 준 함수를 실행해서 화면을 바꿔요!
      }
    } catch (error) {
      console.error("에러 발생!", error);
      alert("서버와 연결할 수 없어요! 백엔드가 켜져 있는지 확인해 보세요.");
    }
  };

  return (
    <div
      style={{
        padding: "100px 20px",
        maxWidth: "400px",
        margin: "0 auto",
        backgroundColor: "#ffffff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        fontFamily: '"Noto Serif KR", serif',
      }}
    >
      <form onSubmit={handleSignup}>
        <h2
          style={{
            fontSize: "28px",
            marginBottom: "40px",
            fontWeight: "600",
            color: "#111",
          }}
        >
          나만의 팔레트 시작하기
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <p style={{ fontSize: "13px", color: "#666", marginBottom: "8px" }}>
              이름
            </p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="성함을 입력하세요"
              style={inputStyle}
              required
            />
          </div>

          <div>
            <p style={{ fontSize: "13px", color: "#666", marginBottom: "8px" }}>
              이메일
            </p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@mail.com"
              style={inputStyle}
              required
            />
          </div>

          <div>
            <p style={{ fontSize: "13px", color: "#666", marginBottom: "8px" }}>
              비밀번호
            </p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              style={inputStyle}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "16px",
            backgroundColor: "#111",
            color: "#fff",
            borderRadius: "12px",
            marginTop: "40px",
            border: "none",
            fontSize: "16px",
            fontWeight: "500",
            cursor: "pointer",
          }}
        >
          가입하기
        </button>
      </form>

      {/* 👈 로그인 화면으로 돌아가고 싶을 때 누르는 버튼 */}
      <p
        onClick={onBackToLogin}
        style={{
          marginTop: "20px",
          textAlign: "center",
          fontSize: "14px",
          color: "#999",
          cursor: "pointer",
          textDecoration: "underline",
        }}
      >
        이미 계정이 있으신가요? 로그인하기
      </p>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  borderRadius: "10px",
  border: "1px solid #e8e6e2",
  backgroundColor: "#fff",
  fontSize: "15px",
  outline: "none",
  boxSizing: "border-box", // 패딩 때문에 칸이 넘치지 않게 방어!
};

export default Signup;
