import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Signup from "./Signup";
import { User } from "lucide-react";

function Home() {
  const [view, setView] = useState("home");
  const [realAlbums, setRealAlbums] = useState([]);
  const [geoData, setGeoData] = useState(null);

  // 1. 데이터 가져오기 (이미지 없이 코드로만!)
  useEffect(() => {
    // 가희님이 저장한 팔레트 데이터
    fetch("http://localhost:8080/api/travels")
      .then((res) => res.json())
      .then((data) => setRealAlbums(data))
      .catch((err) => console.error("데이터 로딩 실패:", err));

    // 세계 국경선 데이터
    fetch(
      "https://raw.githubusercontent.com/datasets/geo-boundaries-world-110m/master/countries.geojson",
    )
      .then((res) => res.json())
      .then((data) =>
        setRealAlbums((prev) => {
          setGeoData(data);
          return prev;
        }),
      );
  }, []);

  // 🎨 수채화 스타일 결정 로직
  const countryStyle = (feature) => {
    const visited = realAlbums.find(
      (album) =>
        album.country &&
        feature.properties.name.toUpperCase() === album.country.toUpperCase(),
    );

    // 랜덤 색상 추출 (imageUrl의 색상 코드 활용)
    const colorCode = visited ? visited.imageUrl.split("/")[3] : "transparent";

    return {
      fillColor: visited ? `#${colorCode}` : "transparent",
      weight: 0.5,
      opacity: 0.1,
      color: "#000", // 액자 컨셉에 맞게 국경선은 아주 연한 검정
      fillOpacity: visited ? 0.4 : 0,
      className: visited ? "watercolor-effect" : "",
    };
  };

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
      {/* ✨ 번짐 효과를 위한 스타일 (가희님 디자인 유지용) */}
      <style>{`
        .watercolor-effect {
          filter: blur(4px); 
          transition: fill 2s ease-in-out;
        }
        .leaflet-container {
          background: #ffffff !important;
        }
      `}</style>

      {/* 2. 상단 사람 아이콘 (User) */}
      <div
        onClick={() => setView("signup")}
        style={{
          position: "absolute",
          top: "30px",
          right: "40px",
          cursor: "pointer",
          zIndex: 10,
          color: "#000000",
        }}
      >
        <User size={28} strokeWidth={1} />
      </div>

      {/* 1. 전시회 타이틀 (디자인 유지) */}
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

      {/* 2. 흑백 세계지도 액자 (디자인 유지) */}
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
          {/* 기본 배경 지도 (가희님이 쓴 라이트 테마) */}
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution="&copy; OpenStreetMap"
          />

          {/* 그 위에 수채화 레이어 덮어쓰기! */}
          {geoData && <GeoJSON data={geoData} style={countryStyle} />}
        </MapContainer>
      </div>

      {/* 3. 하단 문구 (디자인 유지) */}
      <div style={{ marginTop: "40px" }}>
        <p style={{ fontSize: "11px", color: "#aaaaaa", letterSpacing: "6px" }}>
          MUSEUM ARCHIVE : WORLD WIDE
        </p>
      </div>
    </div>
  );
}

export default Home;
