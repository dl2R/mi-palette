import React, { useState, useEffect } from "react";

function Feed({ selectedCity, setSelectedCity }) {
  const [showNewAlbum, setShowNewAlbum] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [realAlbums, setRealAlbums] = useState([]);

  // 🌍 전 세계 주요 도시 데이터 (위도, 경도 좌표 포함)
  // 나중에 Google Places API 등을 연결하기 전까지 사용할 수 있는 데이터셋입니다.
  const worldCities = [
    { name: "BARCELONA", country: "Spain", lat: 41.3851, lng: 2.1734 },
    { name: "BANUATU", country: "Vanuatu", lat: -15.3767, lng: 166.9592 },
    { name: "BANGKOK", country: "Thailand", lat: 13.7563, lng: 100.5018 },
    { name: "SEOUL", country: "South Korea", lat: 37.5665, lng: 126.978 },
    { name: "TOKYO", country: "Japan", lat: 35.6762, lng: 139.6503 },
    { name: "PARIS", country: "France", lat: 48.8566, lng: 2.3522 },
    { name: "NEW YORK", country: "USA", lat: 40.7128, lng: -74.006 },
    { name: "LONDON", country: "UK", lat: 51.5074, lng: -0.1278 },
    { name: "SYDNEY", country: "Australia", lat: -33.8688, lng: 151.2093 },
    { name: "BERLIN", country: "Germany", lat: 52.52, lng: 13.405 },
  ];

  // 🔍 검색창에 입력한 글자가 포함된 도시만 필터링 (예: '바' -> 'BARCELONA', 'BANUATU')
  const filteredCities = worldCities.filter((city) =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  useEffect(() => {
    fetch("http://localhost:8080/api/travels")
      .then((res) => res.json())
      .then((data) => setRealAlbums(data))
      .catch((err) => console.error("데이터 로딩 실패:", err));
  }, []);

  // 📍 도시 선택 시 좌표(lat, lng) 정보를 포함하여 백엔드에 저장
  const handleAddAlbum = (city) => {
    const newTravel = {
      cityName: city.name,
      country: city.country,
      latitude: city.lat,
      longitude: city.lng,
      memo: `${city.country} 여행의 첫 색깔`,
    };

    fetch("http://localhost:8080/api/travels", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTravel),
    })
      .then((res) => res.json())
      .then((savedData) => {
        setRealAlbums([...realAlbums, savedData]);
        setShowNewAlbum(false);
        setSearchQuery("");
        alert(`${city.name} 팔레트가 생성되었습니다! 📍🎨`);
      })
      .catch((err) => console.error("저장 실패:", err));
  };

  const displayAlbums = selectedCity
    ? realAlbums.filter((a) => a.cityName === selectedCity)
    : realAlbums;

  // --- 새 앨범 추가 화면 (전 세계 도시 검색) ---
  if (showNewAlbum) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#fafaf9" }}>
        <div
          style={{
            padding: "20px 24px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            borderBottom: "0.5px solid #eee",
          }}
        >
          <span
            onClick={() => setShowNewAlbum(false)}
            style={{ cursor: "pointer" }}
          >
            ←
          </span>
          <span style={{ fontSize: "14px", fontWeight: "500" }}>
            새 팔레트 추가
          </span>
        </div>
        <div style={{ padding: "20px" }}>
          <input
            type="text"
            placeholder="어느 도시를 기억할까요? (예: 바...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "20px",
              border: "1px solid #eee",
              outline: "none",
            }}
          />

          {searchQuery.length > 0 && (
            <div style={{ marginTop: "20px" }}>
              <p
                style={{
                  fontSize: "11px",
                  color: "#bbb",
                  marginBottom: "10px",
                }}
              >
                검색 결과
              </p>
              {filteredCities.map((city, i) => (
                <div
                  key={i}
                  onClick={() => handleAddAlbum(city)}
                  style={{
                    padding: "15px 10px",
                    borderBottom: "0.5px solid #f5f5f5",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <span style={{ fontSize: "14px", fontWeight: "600" }}>
                      {city.name}
                    </span>
                    <span
                      style={{
                        fontSize: "11px",
                        color: "#aaa",
                        marginLeft: "8px",
                      }}
                    >
                      {city.country}
                    </span>
                  </div>
                  <span style={{ color: "#ccc", fontSize: "18px" }}>+</span>
                </div>
              ))}
              {filteredCities.length === 0 && (
                <p
                  style={{
                    fontSize: "12px",
                    color: "#999",
                    textAlign: "center",
                    marginTop: "20px",
                  }}
                >
                  찾으시는 도시가 데이터에 없습니다.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // --- 메인 갤러리 화면 ---
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#fafaf9",
        paddingBottom: "50px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px 24px",
          alignItems: "center",
        }}
      >
        <span
          style={{ fontSize: "18px", fontWeight: "600", letterSpacing: "1px" }}
        >
          gallery
        </span>
        <div
          onClick={() => setShowNewAlbum(true)}
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            border: "1px solid #ddd",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          +
        </div>
      </div>

      <div style={{ padding: "20px 24px" }}>
        <p style={{ fontSize: "10px", color: "#bbb", marginBottom: "20px" }}>
          MY COLOR ARCHIVE · {realAlbums.length} CITIES
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "12px",
          }}
        >
          {displayAlbums.map((album) => (
            <div key={album.id} style={{ textAlign: "center" }}>
              <div
                style={{
                  width: "100%",
                  aspectRatio: "1",
                  borderRadius: "8px",
                  overflow: "hidden",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
                  marginBottom: "8px",
                  backgroundColor: "#eee",
                }}
              >
                <img
                  src={album.imageUrl}
                  alt={album.cityName}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <span
                style={{ fontSize: "11px", fontWeight: "500", color: "#444" }}
              >
                {album.cityName}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Feed;
