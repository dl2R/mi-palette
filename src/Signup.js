import React, { useState } from "react";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  return (
    <div
      style={{
        // 1. 위아래 여백을 넉넉히 줘서 아래로 내리기
        padding: "100px 20px",

        // 2. 가로 길이를 딱 제한하기 (이게 가희님이 쓰신 maxWidth!)
        maxWidth: "400px",

        // 3. 남는 양옆 공간을 '자동(auto)'으로 채워서 가운데 정렬!
        margin: "0 auto",

        backgroundColor: "#ffffff", // 홈 화면이랑 맞게 화이트로!
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box", // 패딩 때문에 상자가 커지는 걸 막아줘요
      }}
    >
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

      {/* 입력창들 */}
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
    </div>
  );
}

// 공통 스타일 (코드가 깔끔해져요!)
const inputStyle = {
  width: "100%",
  padding: "14px",
  borderRadius: "10px",
  border: "1px solid #e8e6e2",
  backgroundColor: "#fff",
  fontSize: "15px",
  outline: "none",
};

export default Signup; // 👈 매우 중요! 다른 파일에서 쓸 수 있게 내보내기
