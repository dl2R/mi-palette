import React, { useState } from "react";
import Home from "./Home";
import Feed from "./Feed";
import Profile from "./Profile";
import Signup from "./Signup";
import Login from "./Login";

function App() {
  const [view, setView] = useState("home");
  const [selectedCity, setSelectedCity] = useState(null);
  const [user, setUser] = useState(null);

  // 메뉴 클릭 핸들러: 로그인 여부에 따라 똑똑하게 이동시켜줘요
  const handleMenuClick = (menu) => {
    if (menu === "profile" && !user) {
      setView("login");
    } else {
      setView(menu);
    }
  };

  // 화면 렌더링 함수
  const renderContent = () => {
    if (view === "login") {
      return (
        <Login
          onLoginSuccess={(name) => {
            setUser(name);
            setView("profile"); // 로그인하면 바로 내 프로필로 보내주는 게 국룰!
          }}
          onGoToSignup={() => setView("signup")}
        />
      );
    }

    if (view === "signup") {
      return <Signup onBackToLogin={() => setView("login")} />;
    }

    switch (view) {
      case "feed":
        return (
          <Feed selectedCity={selectedCity} setSelectedCity={setSelectedCity} />
        );
      case "profile":
        return (
          <Profile
            setView={setView}
            setSelectedCity={setSelectedCity}
            userName={user}
            onLogout={() => {
              setUser(null);
              setView("home");
            }}
          />
        );
      default:
        return <Home onGoToLogin={() => setView("login")} user={user} />;
    }
  };

  return (
    <div
      style={{
        fontFamily: '"Noto Serif KR", serif',
        backgroundColor: "#ffffff",
        minHeight: "100vh",
        paddingBottom: "80px", // 하단바 높이만큼 공간 확보
      }}
    >
      <main>{renderContent()}</main>

      {/* ✨ 하단 네비게이션 바: 이제 어떤 화면에서든 보입니다! */}
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
        {["feed", "home", "profile"].map((menu) => {
          // ✨ 현재 뷰가 'login'이나 'signup'일 때도 'profile' 탭이 활성화되도록 처리!
          const isActive =
            view === menu ||
            (menu === "profile" && (view === "login" || view === "signup"));

          return (
            <div
              key={menu}
              onClick={() => handleMenuClick(menu)}
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
                  color: isActive ? "#000" : "#bbb",
                  fontWeight: isActive ? "500" : "300",
                  transition: "0.3s",
                }}
              >
                {menu === "feed" ? "GALLERY" : menu.toUpperCase()}
              </span>
              {isActive && (
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
          );
        })}
      </nav>
    </div>
  );
}

export default App;
