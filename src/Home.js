import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function Home() {
  return (
    <div
      style={{
        textAlign: "center",
        minHeight: "100vh",
        backgroundColor: "#ffffff",
        paddingTop: "60px",
        fontFamily: '"Noto Serif KR", serif',
      }}
    >
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

      {/* 2. 흑백 세계지도 액자 */}
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
          zoomControl={false} // 깔끔하게 줌 버튼 숨기기
        >
          {/* ✨ 마법의 흑백 필터: CartoDB Positron (세련된 그레이톤) */}
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
