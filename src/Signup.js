import React, { useState } from "react";

function Signup() {
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
      alert(result); // 자바에서 보낸 대답 띄우기
    } catch (error) {
      console.error("에러 발생!", error);
      alert("서버와 연결할 수 없어요! 백엔드가 켜져 있는지 확인해 보세요.");
    }
  }; // 👈 여기서 handleSignup 함수가 끝납니다!

  // 리액트 컴포넌트는 여기서부터 화면을 그립니다.
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
      }}
    >
      <form onSubmit={handleSignup}>
        {" "}
        {/* 👈 handleSignup 함수를 바로 연결하세요 */}
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
    </div>
  );
} // 👈 Signup 함수가 여기서 닫혀야 해요!

const inputStyle = {
  width: "100%",
  padding: "14px",
  borderRadius: "10px",
  border: "1px solid #e8e6e2",
  backgroundColor: "#fff",
  fontSize: "15px",
  outline: "none",
};

export default Signup;
