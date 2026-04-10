import React, { useState } from "react";

// ✨ onLogout 프롭을 추가로 받아옵니다!
function Profile({ setView, setSelectedCity, userName, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const travels = [
    { country: "SOUTH KOREA", cities: ["SEOUL", "BUSAN"], color: "#4a9e6b" },
    { country: "SPAIN", cities: ["BARCELONA"], color: "#c4763a" },
  ];

  const handleCityClick = (city) => {
    setSelectedCity(city);
    setView("feed");
  };

  // ✨ 로그아웃 클릭 시 실행될 함수
  const handleLogoutClick = () => {
    if (window.confirm("정말 로그아웃 하시겠어요?")) {
      onLogout(); // App.js의 user를 null로 만들고 홈으로 보냅니다.
    }
  };

  return (
    <div
      style={{
        padding: "20px 24px 100px",
        backgroundColor: "#ffffff",
        minHeight: "100vh",
        fontFamily: '"Noto Serif KR", serif',
        position: "relative",
        overflowX: "hidden",
      }}
    >
      {/* 1. 어두운 배경 막 */}
      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            zIndex: 998,
            transition: "0.3s",
          }}
        />
      )}

      {/* 2. 오른쪽 사이드바 메뉴 */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: isMenuOpen ? "0" : "-100%",
          width: "15%", // ✨15고정
          boxShadow: "-5px 0 15px rgba(0,0,0,0.05)",
          height: "100%",
          backgroundColor: "#ffffff",
          zIndex: 999,
          transition: "0.4s ease-in-out",
          padding: "80px 40px",
          display: "flex",
          flexDirection: "column",
          gap: "40px",
          boxShadow: "-10px 0 30px rgba(0,0,0,0.05)",
        }}
      >
        <div
          onClick={() => setIsMenuOpen(false)}
          style={{
            position: "absolute",
            top: "25px",
            right: "24px",
            fontSize: "20px",
            cursor: "pointer",
            fontWeight: "200",
          }}
        >
          ✕
        </div>

        <div style={{ marginTop: "40px" }}>
          <p
            style={{
              fontSize: "9px",
              color: "#bbb",
              letterSpacing: "4px",
              marginBottom: "30px",
            }}
          >
            MENU
          </p>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "30px" }}
          >
            <button
              style={{
                background: "none",
                border: "none",
                textAlign: "left",
                fontSize: "14px",
                color: "#333",
                letterSpacing: "3px",
                cursor: "pointer",
              }}
            >
              SETTINGS
            </button>

            {/* ✨ LOGOUT 버튼에 클릭 이벤트 연결! */}
            <button
              onClick={handleLogoutClick}
              style={{
                background: "none",
                border: "none",
                textAlign: "left",
                fontSize: "14px",
                color: "#ff9500",
                letterSpacing: "3px",
                cursor: "pointer",
              }}
            >
              LOGOUT
            </button>
          </div>
        </div>
      </div>

      {/* 3. 상단 우측 햄버거 메뉴 버튼 */}
      {!isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(true)}
          style={{
            position: "absolute",
            top: "25px",
            right: "24px",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            zIndex: 1001,
          }}
        >
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{ width: "20px", height: "1px", backgroundColor: "#000" }}
            />
          ))}
        </div>
      )}

      {/* 4. 프로필 중앙 영역 */}
      <div
        style={{ textAlign: "center", marginTop: "40px", marginBottom: "60px" }}
      >
        <div
          style={{
            width: "75px",
            height: "75px",
            borderRadius: "50%",
            backgroundColor: "#fff",
            border: "0.5px solid #000",
            margin: "0 auto 24px",
          }}
        />
        <h2
          style={{
            fontSize: "18px",
            letterSpacing: "6px",
            fontWeight: "400",
            marginBottom: "8px",
          }}
        >
          {userName || "GAHEE"}
        </h2>
        <p style={{ fontSize: "11px", color: "#aaa", letterSpacing: "2px" }}>
          @dl2R
        </p>
      </div>

      {/* 5. 여행 로그 */}
      <div style={{ textAlign: "center" }}>
        <p
          style={{
            fontSize: "10px",
            color: "#bbb",
            letterSpacing: "5px",
            marginBottom: "40px",
          }}
        >
          MY TRAVEL LOG
        </p>
        {travels.map((item) => (
          <div key={item.country} style={{ marginBottom: "40px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                marginBottom: "12px",
              }}
            >
              <div
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  backgroundColor: item.color,
                }}
              />
              <div
                style={{
                  fontSize: "13px",
                  letterSpacing: "2px",
                  color: "#111",
                  fontWeight: "500",
                }}
              >
                {item.country}
              </div>
            </div>
            <div
              style={{
                fontSize: "11px",
                color: "#aaa",
                display: "flex",
                justifyContent: "center",
                gap: "15px",
              }}
            >
              {item.cities.map((city) => (
                <span
                  key={city}
                  onClick={() => handleCityClick(city)}
                  style={{
                    cursor: "pointer",
                    borderBottom: "1px solid #f0f0f0",
                    paddingBottom: "2px",
                  }}
                >
                  {city}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;
