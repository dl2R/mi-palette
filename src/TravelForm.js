import React, { useState } from "react";

function TravelForm() {
  const [cityName, setCityName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [memo, setMemo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. 우리가 백엔드에 보낼 데이터 뭉치
    const travelData = {
      cityName: cityName,
      imageUrl: imageUrl,
      memo: memo,
    };

    // 2. 백엔드 우체국(Controller)으로 데이터 쏘기!
    fetch("http://localhost:8080/api/travels", {
      method: "POST", // "데이터 저장해줘!"라는 뜻
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(travelData), // 자바스크립트 객체를 JSON 문자열로 변신!
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("저장 성공!:", data);
        alert("바르셀로나의 추억이 저장됐어요! ✨");
      })
      .catch((error) => {
        console.error("에러 발생:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="도시 이름"
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
      />
      <input
        type="text"
        placeholder="이미지 URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <textarea
        placeholder="메모를 적어주세요"
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
      />
      <button type="submit">저장하기</button>
    </form>
  );
}

export default TravelForm;
