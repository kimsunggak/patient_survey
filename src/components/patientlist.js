import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // ✅ useNavigate 추가
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
  const navigate = useNavigate();  // ✅ 페이지 이동을 위한 useNavigate 사용

  return (
    <div className="patient-list">
      <h2>환자 목록</h2>
      <div className="patient-container">
        {patients.map((patient) => (
          <div
            key={patient.id}
            className="patient-card"
            onClick={() => navigate(`/patient/${patient.id}`)}  // ✅ 클릭 시 환자 상세 페이지 이동
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
