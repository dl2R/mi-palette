import React, { useState } from "react";

// onLoginSuccess: 로그인 성공 시 유저 이름을 부모에게 전달
// onGoToSignup: "회원가입" 글자를 눌렀을 때 화면을 전환
function Login({ onLoginSuccess, onGoToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    // ✨ form 태그의 기본 새로고침 현상을 막아줍니다. (엔터 기능의 필수템!)
    if (e) e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const name = await response.text();

      // 백엔드에서 준 응답이 실패 메시지가 아니라면 (즉, 이름이라면)
      if (name !== "fail:email" && name !== "fail:password") {
        alert(`${name}님, 환영합니다!`);
        onLoginSuccess(name); // App.js의 user 상태를 이름으로 업데이트!
      } else {
        alert("이메일 또는 비밀번호가 올바르지 않습니다.");
      }
    } catch (error) {
      console.error("로그인 중 에러 발생:", error);
      alert("서버와 연결할 수 없습니다. 백엔드를 확인해 주세요!");
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
      <h2
        style={{
          fontSize: "28px",
          marginBottom: "40px",
          fontWeight: "600",
          color: "#111",
        }}
      >
        다시 오신 것을
        <br />
        환영합니다
      </h2>

      {/* ✨ div 대신 form을 사용하고 onSubmit에 함수를 연결했어요! */}
      <form onSubmit={handleLogin}>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <p style={{ fontSize: "13px", color: "#666", marginBottom: "8px" }}>
              이메일
            </p>
            <input
              type="email"
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
              required
            />
          </div>

          <button
            type="submit" // ✨ 타입을 submit으로 지정해서 엔터키가 먹히게 합니다!
            style={{
              width: "100%",
              padding: "16px",
              backgroundColor: "#111",
              color: "#fff",
              borderRadius: "12px",
              marginTop: "20px",
              border: "none",
              fontSize: "16px",
              fontWeight: "500",
              cursor: "pointer",
              transition: "0.3s",
            }}
          >
            로그인하기
          </button>
        </div>
      </form>

      {/* ✨ 회원가입으로 넘어가는 링크 추가 */}
      <div style={{ marginTop: "30px", textAlign: "center" }}>
        <p style={{ fontSize: "14px", color: "#999" }}>
          아직 계정이 없으신가요?{" "}
          <span
            onClick={onGoToSignup}
            style={{
              color: "#111",
              fontWeight: "600",
              cursor: "pointer",
              textDecoration: "underline",
              marginLeft: "8px",
            }}
          >
            회원가입
          </span>
        </p>
      </div>
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
  boxSizing: "border-box",
};

export default Login;
