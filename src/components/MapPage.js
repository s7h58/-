import React from "react";
import "../App.css";

function MapPage() {
  const address = "경기도 화성시 효행로1265번길 84";
  const googleMapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    address
  )}&output=embed`;

  return (
    <div className="map-container">
      <h2 className="map-title">찾아오시는 길</h2>

      {/* 지도 영역 */}
      <div className="map-box">
        <iframe
          title="찾아오시는 길"
          src={googleMapSrc}
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>

      {/* 회사 정보 영역 */}
      <div className="company-info">
        <table>
          <tbody>
            <tr>
              <th>회사명</th>
              <td>경기냉난시스템</td>
            </tr>
            <tr>
              <th>회사주소</th>
              <td>{address}</td>
            </tr>
            <tr>
              <th>대표전화</th>
              <td>010-3035-2244</td>
            </tr>
            <tr>
              <th>이메일</th>
              <td>@@@@@@@@naver.com</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MapPage;
