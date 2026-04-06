import React, { useState } from "react";

const albums = [
  {
    id: 1,
    city: "SEOUL",
    country: "대한민국",
    color: "#4a9e6b",
    photos: [
      { id: 1, bg: "#1a3325" },
      { id: 2, bg: "#2a5238" },
      { id: 3, bg: "#234a31" },
      { id: 4, bg: "#163521" },
      { id: 5, bg: "#0f2e1e" },
      { id: 6, bg: "#1d4028" },
    ],
  },
  {
    id: 2,
    city: "BARCELONA",
    country: "스페인",
    color: "#c4763a",
    photos: [
      { id: 1, bg: "#3d1f0a" },
      { id: 2, bg: "#5c2e10" },
      { id: 3, bg: "#472415" },
      { id: 4, bg: "#6b3a1f" },
    ],
  },
];

function Feed({ selectedCity, setSelectedCity }) {
  // ✅ [중요] 모든 Hook(useState)을 컴포넌트 최상단으로 올렸습니다. 에러 해결!
  const [showNewAlbum, setShowNewAlbum] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // 필터링 로직
  const displayAlbums = selectedCity
    ? albums.filter((a) => a.city === selectedCity)
    : albums;

  // --- 1. 새 앨범 추가 화면 ---
  if (showNewAlbum) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#fafaf9",
          paddingBottom: "80px",
        }}
      >
        <div
          style={{ padding: "20px 24px", borderBottom: "0.5px solid #e8e6e2" }}
        >
          <span
            onClick={() => setShowNewAlbum(false)}
            style={{ cursor: "pointer" }}
          >
            ← 뒤로가기
          </span>
        </div>
        <div style={{ padding: "40px", textAlign: "center", color: "#ccc" }}>
          도시 검색 기능 준비 중...
        </div>
      </div>
    );
  }

  // --- 2. 메인 갤러리 화면 ---
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#fafaf9",
        fontFamily: '"Noto Serif KR", serif',
        paddingBottom: "80px",
      }}
    >
      {/* 헤더 영역 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 24px 12px",
          borderBottom: "0.5px solid #e8e6e2",
        }}
      >
        <span
          onClick={() => setSelectedCity(null)}
          style={{
            fontSize: "14px",
            fontWeight: "500",
            color: "#111",
            letterSpacing: "-0.3px",
            cursor: "pointer",
          }}
        >
          {selectedCity ? `gallery : ${selectedCity}` : "gallery"}
        </span>

        {selectedCity && (
          <span
            onClick={() => setSelectedCity(null)}
            style={{
              fontSize: "10px",
              color: "#aaa",
              cursor: "pointer",
              letterSpacing: "1px",
            }}
          >
            ALL PHOTOS ✕
          </span>
        )}

        {!selectedCity && (
          <div
            onClick={() => setShowNewAlbum(true)}
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              border: "0.5px solid #ddd",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <span
              style={{ fontSize: "16px", color: "#aaa", fontWeight: "200" }}
            >
              +
            </span>
          </div>
        )}
      </div>

      <div style={{ padding: "16px 24px 0" }}>
        {/* ✨ 임시 도착지 알림 (도시를 눌러서 왔을 때만 보임) */}
        {selectedCity && (
          <div
            style={{
              padding: "10px",
              marginBottom: "20px",
              border: "1px dashed #ddd",
              textAlign: "center",
            }}
          >
            <p style={{ fontSize: "12px", color: "#666" }}>
              📍 <strong>{selectedCity}</strong> 앨범으로 잘 도착했어요!
            </p>
            <p style={{ fontSize: "10px", color: "#bbb" }}>
              상세 페이지는 내일 정렬 작업 후에 연결될 거예요.
            </p>
          </div>
        )}

        <p
          style={{
            fontSize: "9px",
            color: "#bbb",
            letterSpacing: "0.12em",
            marginBottom: "20px",
          }}
        >
          {selectedCity
            ? `${selectedCity} ARCHIVE`
            : `내 앨범 · ${albums.length}`}
        </p>

        {/* 앨범 그리드 출력 */}
        {displayAlbums.map((album, index) => (
          <div key={album.id} style={{ marginBottom: "16px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "8px",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <div
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    backgroundColor: album.color,
                  }}
                />
                <span
                  style={{ fontSize: "11px", fontWeight: "500", color: "#111" }}
                >
                  {album.city}
                </span>
              </div>
              <span style={{ fontSize: "9px", color: "#ccc" }}>
                {album.photos.length}
              </span>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr",
                gap: "3px",
                marginBottom: "3px",
              }}
            >
              <div
                style={{
                  aspectRatio: "1.3",
                  borderRadius: "4px",
                  backgroundColor: album.photos[0]?.bg,
                  gridRow: "span 2",
                }}
              />
              <div
                style={{
                  aspectRatio: "1",
                  borderRadius: "4px",
                  backgroundColor: album.photos[1]?.bg,
                }}
              />
              <div
                style={{
                  aspectRatio: "1",
                  borderRadius: "4px",
                  backgroundColor: album.photos[2]?.bg,
                }}
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "3px",
              }}
            >
              {album.photos.slice(3).map((photo) => (
                <div
                  key={photo.id}
                  style={{
                    aspectRatio: "1",
                    borderRadius: "4px",
                    backgroundColor: photo.bg,
                  }}
                />
              ))}
            </div>

            {index < displayAlbums.length - 1 && (
              <div
                style={{
                  height: "0.5px",
                  backgroundColor: "#e8e6e2",
                  margin: "16px 0",
                }}
              />
            )}
          </div>
        ))}

        {displayAlbums.length === 0 && (
          <div
            style={{
              textAlign: "center",
              paddingTop: "100px",
              color: "#ccc",
              fontSize: "12px",
              letterSpacing: "2px",
            }}
          >
            NO PHOTOS FOUND
          </div>
        )}
      </div>
    </div>
  );
}

export default Feed;
