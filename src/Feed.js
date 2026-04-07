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
    color: "#e8874a",
    photos: [
      { id: 1, bg: "#5c2e10" },
      { id: 2, bg: "#7a3d18" },
      { id: 3, bg: "#3d1f0a" },
      { id: 4, bg: "#6b3a1f" },
      { id: 5, bg: "#8a4a22" },
    ],
  },
  {
    city: "VENECIA",
    country: "이탈리아",
    color: "#1e2fe9",
    photos: [
      { id: 1, bg: "#363ed8" },
      { id: 2, bg: "#607ebd" },
      { id: 3, bg: "#348dd6" },
      { id: 4, bg: "#231f6b" },
      { id: 5, bg: "#3252e0" },
    ],
  },
];

function Feed({ selectedCity, setSelectedCity }) {
  const [showNewAlbum, setShowNewAlbum] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const displayAlbums = selectedCity
    ? albums.filter((a) => a.city === selectedCity)
    : albums;

  // --- 새 앨범 추가 화면 ---
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
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "20px 24px",
            borderBottom: "0.5px solid #e8e6e2",
          }}
        >
          <span
            onClick={() => setShowNewAlbum(false)}
            style={{ cursor: "pointer", fontSize: "18px", color: "#111" }}
          >
            ←
          </span>
          <span
            style={{
              fontSize: "14px",
              fontWeight: "500",
              color: "#111",
              letterSpacing: "-0.3px",
            }}
          >
            새 앨범
          </span>
        </div>

        <div style={{ padding: "20px 24px 0" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "#f0efed",
              borderRadius: "24px",
              padding: "10px 16px",
              marginBottom: "24px",
            }}
          >
            <span style={{ fontSize: "12px", color: "#aaa" }}>⌕</span>
            <input
              type="text"
              placeholder="도시 검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                border: "none",
                background: "none",
                outline: "none",
                fontSize: "12px",
                color: "#111",
                letterSpacing: "0.05em",
                width: "100%",
                fontFamily: '"Noto Serif KR", serif',
              }}
            />
          </div>

          {searchQuery.length > 0 ? (
            <div>
              <p
                style={{
                  fontSize: "9px",
                  color: "#bbb",
                  letterSpacing: "0.12em",
                  marginBottom: "8px",
                }}
              >
                검색 결과
              </p>
              {["바르셀로나 · 스페인", "방콕 · 태국", "도쿄 · 일본"].map(
                (item, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "12px 0",
                      borderBottom: "0.5px solid #eee",
                      cursor: "pointer",
                    }}
                  >
                    <div>
                      <p
                        style={{
                          fontSize: "12px",
                          color: "#111",
                          fontWeight: "500",
                          margin: 0,
                        }}
                      >
                        {item.split(" · ")[0]}
                      </p>
                      <p
                        style={{
                          fontSize: "9px",
                          color: "#bbb",
                          margin: "2px 0 0",
                          letterSpacing: "0.05em",
                        }}
                      >
                        {item.split(" · ")[1]}
                      </p>
                    </div>
                    <span
                      style={{
                        fontSize: "18px",
                        color: "#ccc",
                        fontWeight: "200",
                      }}
                    >
                      +
                    </span>
                  </div>
                ),
              )}
            </div>
          ) : (
            <div style={{ textAlign: "center", paddingTop: "60px" }}>
              <p
                style={{
                  fontSize: "11px",
                  color: "#ccc",
                  letterSpacing: "4px",
                }}
              >
                SEARCH A CITY
              </p>
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
        fontFamily: '"Noto Serif KR", serif',
        paddingBottom: "80px",
      }}
    >
      {/* 헤더 */}
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
        {selectedCity ? (
          <span
            onClick={() => setSelectedCity(null)}
            style={{
              fontSize: "10px",
              color: "#aaa",
              cursor: "pointer",
              letterSpacing: "1px",
            }}
          >
            ALL ✕
          </span>
        ) : (
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

      {/* 탭 - selectedCity 없을 때만 보임 */}
      {!selectedCity && (
        <div style={{ display: "flex", borderBottom: "0.5px solid #e8e6e2" }}>
          <div
            onClick={() => setActiveTab("all")}
            style={{
              flex: 1,
              textAlign: "center",
              padding: "10px 0 8px",
              cursor: "pointer",
              borderBottom: activeTab === "all" ? "1.5px solid #111" : "none",
            }}
          >
            <span
              style={{
                fontSize: "9px",
                color: activeTab === "all" ? "#111" : "#ccc",
                fontFamily: '"Noto Serif KR", serif',
                letterSpacing: "0.1em",
                fontWeight: activeTab === "all" ? "500" : "400",
              }}
            >
              ALL
            </span>
          </div>
          <div
            onClick={() => setActiveTab("cities")}
            style={{
              flex: 1,
              textAlign: "center",
              padding: "10px 0 8px",
              cursor: "pointer",
              borderBottom:
                activeTab === "cities" ? "1.5px solid #111" : "none",
            }}
          >
            <span
              style={{
                fontSize: "9px",
                color: activeTab === "cities" ? "#111" : "#ccc",
                fontFamily: '"Noto Serif KR", serif',
                letterSpacing: "0.1em",
                fontWeight: activeTab === "cities" ? "500" : "400",
              }}
            >
              CITIES
            </span>
          </div>
        </div>
      )}

      <div style={{ padding: "80px 120px 80px" }}>
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

        {/* ALL 탭 — 도시별 3열 그리드 */}
        {(activeTab === "all" || selectedCity) && (
          <>
            {/* 앨범 리스트 출력 영역 */}
            {displayAlbums.map((album, index) => (
              <div key={album.id} style={{ marginBottom: "24px" }}>
                {/* 앨범 제목 (도시 이름) */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "12px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
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
                      style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#111",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {album.city}
                    </span>
                  </div>
                  <span style={{ fontSize: "9px", color: "#ccc" }}>
                    {album.photos.length}
                  </span>
                </div>

                {/* 📸 여기가 핵심! 열었을 때와 닫았을 때 레이아웃이 바뀝니다 */}
                <div
                  style={
                    selectedCity
                      ? {
                          // 1️⃣ 앨범을 열었을 때 (VSCO 스타일: 2열 세로 흐름)
                          columnCount: 3,
                          columnGap: "8px",
                        }
                      : {
                          // 2️⃣ 메인 화면일 때 (기본 스타일: 3열 정사각형 바둑판)
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr 1fr", //중요* 우편함스타일
                          gap: "2px",
                        }
                  }
                >
                  {album.photos.map((photo, pIndex) => (
                    <div
                      key={photo.id}
                      style={{
                        width: "100%",
                        borderRadius: "2px",
                        backgroundColor: photo.bg,

                        // ✅ 열었을 때(selectedCity 존재)는 높이를 제각각으로!
                        // ✅ 닫혔을 때는 정사각형(aspectRatio: 1)으로!
                        aspectRatio: selectedCity ? "unset" : "1",

                        height: selectedCity
                          ? pIndex % 3 === 0
                            ? "240px"
                            : pIndex % 3 === 1
                              ? "180px"
                              : "300px"
                          : "auto",

                        marginBottom: selectedCity ? "4px" : "0",
                        breakInside: "avoid", // 사진이 중간에 잘리지 않게 함
                      }}
                    />
                  ))}
                </div>

                {/* 구분선 (도시가 여러 개일 때만 표시) */}
                {!selectedCity && index < displayAlbums.length - 1 && (
                  <div
                    style={{
                      height: "0.5px",
                      backgroundColor: "#e8e6e2",
                      margin: "24px 0",
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
          </>
        )}

        {/* CITIES 탭 — 도시당 대표사진 하나 */}
        {activeTab === "cities" && !selectedCity && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "3px",
            }}
          >
            {albums.map((album) => (
              <div
                key={album.id}
                onClick={() => setSelectedCity(album.city)}
                style={{
                  position: "relative",
                  aspectRatio: "1",
                  borderRadius: "4px",
                  overflow: "hidden",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: album.photos[0]?.bg,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "8px",
                    background:
                      "linear-gradient(transparent, rgba(0,0,0,0.55))",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <div
                      style={{
                        width: "4px",
                        height: "4px",
                        borderRadius: "50%",
                        backgroundColor: album.color,
                      }}
                    />
                    <span
                      style={{
                        fontSize: "11px",
                        color: "#fff",
                        fontFamily: '"Noto Serif KR", serif',
                        letterSpacing: "0.06em",
                      }}
                    >
                      {album.city}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            <div
              onClick={() => setShowNewAlbum(true)}
              style={{
                aspectRatio: "1",
                borderRadius: "4px",
                border: "0.5px dashed #ddd",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <span
                style={{ fontSize: "22px", color: "#ddd", fontWeight: "200" }}
              >
                +
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Feed;
