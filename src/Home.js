import React, { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Signup from "./Signup";
import { User } from "lucide-react"; // 1. ✨ 얇은 선 사람 아이콘(User) 가져오기!

function Home() {
  const [view, setView] = useState("home");

  if (view === "signup") {
    return <Signup onBack={() => setView("home")} />;
  }

  return (
    <div
      style={{
        textAlign: "center",
        minHeight: "100vh",
        backgroundColor: "#ffffff",
        paddingTop: "60px",
        fontFamily: '"Noto Serif KR", serif',
        position: "relative",
      }}
    >
      {/* 2. ✨ 이모지 대신 얇은 선 아이콘 넣기 */}
      <div
        onClick={() => setView("signup")}
        style={{
          position: "absolute",
          top: "30px",
          right: "40px",
          cursor: "pointer",
          zIndex: 10,
          // 아이콘의 색상과 크기를 여기서 조절해요!
          color: "#000000", // 선 색깔은 검은색
        }}
      >
        <User size={28} strokeWidth={1} />{" "}
        {/* ✨ 크기는 28px, 선 두께는 가장 가늘게(1) */}
      </div>

      {/* 1. 전시회 타이틀 */}
      <h1
        style={{
          fontSize: "32px",
          fontWeight: "200",
          letterSpacing: "12px",
          marginBottom: "40px",
          textTransform: "uppercase",
        }}
      >
        Palette
      </h1>

      {/* 2. 흑백 세계지도 액자 (가희님이 만든 멋진 지도!) */}
      <div
        style={{
          width: "95%",
          maxWidth: "900px",
          height: "550px",
          margin: "0 auto",
          border: "1px solid #000000",
          boxShadow: "0 20px 40px rgba(0,0,0,0.05)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <MapContainer
          center={[20, 0]}
          zoom={2}
          style={{ width: "100%", height: "100%" }}
          zoomControl={false}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution="&copy; OpenStreetMap"
          />
        </MapContainer>
      </div>

      {/* 3. 하단 문구 */}
      <div style={{ marginTop: "40px" }}>
        <p style={{ fontSize: "11px", color: "#aaaaaa", letterSpacing: "6px" }}>
          MUSEUM ARCHIVE : WORLD WIDE
        </p>
      </div>
    </div>
  );
}

export default Home;
