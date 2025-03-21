import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./patientlist.css";

const initialPatients = [
  { id: 1, name: "가나다 환자", score: 75 },
  { id: 2, name: "권지용 환자", score: 80 },
  { id: 3, name: "이민주 환자", score: 85 },
  { id: 4, name: "김이름 환자", score: 78 },
  { id: 5, name: "마바사 환자", score: 82 },
  { id: 6, name: "주지훈 환자", score: 88 },
];

const PatientList = () => {
  const [patients] = useState(initialPatients);
  const [searchTerm, setSearchTerm] = useState(""); // 🔍 검색어 상태
  const [sortByName, setSortByName] = useState(false); // 가나다순 정렬 여부
  const [sortByLatest, setSortByLatest] = useState(false); // 최신순 정렬 여부
  const [errorMessage, setErrorMessage] = useState(""); // 검색 오류 메시지
  const navigate = useNavigate();

  // 🔍 검색 기능 (Enter 키 입력 시 실행)
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const foundPatients = initialPatients.filter((patient) =>
        patient.name.includes(searchTerm)
      );

      if (foundPatients.length === 0) {
        setErrorMessage("존재하지 않는 환자입니다. 이름을 다시 입력해주세요.");
      } else {
        setErrorMessage(""); // 검색 성공 시 에러 메시지 제거
      }
    }
  };

  // 🔄 정렬 기능 (가나다순 + 최신순 조합)
  const sortedPatients = [...initialPatients]
    .filter((patient) => patient.name.includes(searchTerm)) // 검색 필터 적용
    .sort((a, b) => {
      if (sortByName && sortByLatest) {
        return a.name.localeCompare(b.name) || b.id - a.id; // 가나다순 -> 최신순
      } else if (sortByName) {
        return a.name.localeCompare(b.name); // 가나다순 정렬
      } else if (sortByLatest) {
        return b.id - a.id; // 최신순 정렬
      }
      return 0;
    });

  return (
    <div className="patient-list">
      <h2>환자 목록</h2>

      {/* 🔍 검색 & 정렬 UI */}
      <div className="search-sort-container">
        <input
          type="text"
          placeholder="환자 이름을 검색해주세요."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleSearch} // ⏎ Enter 키 이벤트 추가
          className="search-input"
        />
        
        {/* 정렬 토글 버튼 */}
        <label className="toggle-switch">
          <input type="checkbox" checked={sortByName} onChange={() => setSortByName(!sortByName)} />
          <span className="slider"></span>
        </label>
        가나다순

        <label className="toggle-switch">
          <input type="checkbox" checked={sortByLatest} onChange={() => setSortByLatest(!sortByLatest)} />
          <span className="slider"></span>
        </label>
        최신순
      </div>

      {/* 검색 결과가 없을 때 경고 메시지 */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {/* 정렬된 & 검색된 환자 목록 표시 */}
      <div className="patient-container">
        {sortedPatients.map((patient) => (
          <div
            key={patient.id}
            className="patient-card"
            onClick={() => navigate(`/patient/${patient.id}`)}
          >
            <h3>{patient.name}</h3>
            <p>종합점수: {patient.score}점</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientList;
