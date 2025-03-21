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
  const [sortOrder, setSortOrder] = useState("latest"); // 🔄 정렬 상태
  const navigate = useNavigate();

  // 🔍 검색 기능 (이름 필터링)
  const filteredPatients = patients.filter((patient) =>
    patient.name.includes(searchTerm) // 입력한 검색어가 포함된 환자만 필터링
  );

  // 🔄 정렬 기능
  const sortedPatients = [...filteredPatients].sort((a, b) => {
    if (sortOrder === "name") return a.name.localeCompare(b.name); // 가나다순 정렬
    if (sortOrder === "latest") return b.id - a.id; // 최신순 정렬
    return 0;
  });

  return (
    <div className="patient-list">
      <h2>환자 목록</h2>

      {/* 🔍 검색 & 정렬 UI */}
      <div className="search-sort-container">
        <input
          type="text"
          placeholder="환자 이름 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button onClick={() => setSortOrder("name")}>가나다순</button>
        <button onClick={() => setSortOrder("latest")}>최신순</button>
      </div>

      {/* 🔄 정렬된 & 검색된 환자 목록 표시 */}
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
