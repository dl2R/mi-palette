import React, { useState } from "react";
import Home from "./Home";
import Feed from "./Feed";
import Profile from "./Profile";
import Signup from "./Signup";

function App() {
  const [view, setView] = useState("home");

  // ✨ [추가] 선택된 도시를 기억할 새로운 주머니예요!
  const [selectedCity, setSelectedCity] = useState(null);

  // 하단 바 메뉴를 누를 때 실행될 함수
  const handleMenuClick = (menu) => {
    setView(menu);
    // 갤러리 탭을 직접 누를 때는 '전체 보기'로 초기화하고 싶다면 아래 주석을 해제하세요.
    // if (menu === "feed") setSelectedCity(null);
  };

  return (
    <div
      style={{
        fontFamily: '"Noto Serif KR", serif',
        backgroundColor: "#ffffff",
        minHeight: "100vh",
        paddingBottom: "80px",
      }}
    >
      <main>
        {view === "home" && <Home />}

        {/* ✨ [수정] Feed에게 선택된 도시 정보를 전달합니다. */}
        {view === "feed" && (
          <Feed selectedCity={selectedCity} setSelectedCity={setSelectedCity} />
        )}

        {/* ✨ [수정] Profile에게 도시를 선택하는 능력을 전달합니다. */}
        {view === "profile" && (
          <Profile setView={setView} setSelectedCity={setSelectedCity} />
        )}
      </main>

      <nav
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          borderTop: "0.5px solid #efefef",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          padding: "20px 0 35px",
          zIndex: 1000,
        }}
      >
        {["feed", "home", "profile"].map((menu) => (
          <div
            key={menu}
            onClick={() => handleMenuClick(menu)} // ✨ [수정] 클릭 시 함수 실행
            style={{
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span
              style={{
                fontSize: "9px",
                letterSpacing: "4px",
                color: view === menu ? "#000" : "#bbb",
                fontWeight: view === menu ? "500" : "300",
                transition: "0.3s",
              }}
            >
              {menu === "feed" ? "GALLERY" : menu.toUpperCase()}
            </span>
            {view === menu && (
              <div
                style={{
                  width: "3px",
                  height: "3px",
                  backgroundColor: "#000",
                  borderRadius: "50%",
                }}
              />
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}

export default App;
