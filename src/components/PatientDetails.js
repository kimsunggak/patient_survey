import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend } from "chart.js";
import "./PatientDetails.css";

ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const PatientDetails = ({ patientData, onSelectSidebar = () => {} }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const patient = patientData.find((p) => p.id === parseInt(id));

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState(""); // 입력할 코멘트

  useEffect(() => {
    onSelectSidebar("patientInfo");

    // ✅ 로컬 스토리지에서 환자별 코멘트 불러오기
    const storedComments = JSON.parse(localStorage.getItem("comments")) || {};
    const patientComments = storedComments[patient.name] || [];
    setComments(patientComments.slice(-3)); // 최근 3개만 표시
  }, [onSelectSidebar, patient.name]);

  // ✅ 코멘트 저장 함수
  const addComment = () => {
    if (!newComment.trim()) return;
    const commentWithDate = { text: newComment, date: new Date().toLocaleString() };

    const storedComments = JSON.parse(localStorage.getItem("comments")) || {};
    const updatedComments = [...(storedComments[patient.name] || []), commentWithDate];

    storedComments[patient.name] = updatedComments;
    localStorage.setItem("comments", JSON.stringify(storedComments));

    setComments(updatedComments.slice(-3)); // 최근 3개만 표시
    setNewComment(""); // 입력창 초기화
  };

  // ✅ 결과 분석 데이터 (막대 그래프)
  const sectionLabels = [
    "암 이후 몸 변화",
    "건강한 삶 관리",
    "회복 지원",
    "심리적 부담",
    "사회적 부담",
    "탄력성 및 미래 계획",
  ];
  const patientScores = [30, 50, 75, 60, 80, 40]; // 예제 데이터
  const averageScores = [40, 55, 70, 65, 75, 50]; // 예제 데이터

  // ✅ 막대 그래프 데이터
  const barChartData = {
    labels: sectionLabels,
    datasets: [
      {
        label: "환자 점수",
        data: patientScores,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
      {
        label: "평균 점수",
        data: averageScores,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  // ✅ 도넛 그래프 데이터
  const doughnutChartData = {
    labels: sectionLabels,
    datasets: [
      {
        data: patientScores,
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"],
      },
    ],
  };

  return (
    <div className="patient-details">
      <h2>{patient.name} 환자</h2>
      <div className="patient-info">
        <p>나이: {patient.age}세</p>
        <p>성별: {patient.gender}</p>
        <p>진료과: {patient.department}</p>
        <p>퇴원 예정일: {patient.dischargeDate}</p>
        <p>연락처: {patient.phone}</p>
        <p>이메일: {patient.email}</p>
      </div>
      <div className="score-card">
        <h3>종합점수: {patient.totalScore}점</h3>
        <p>상태: {patient.status}</p>
      </div>

      {/* ✅ 결과 분석 차트 (막대 그래프) */}
      <div className="analysis-section">
        <h3>결과 분석</h3>
        <div className="chart-container">
          <Bar data={barChartData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      </div>

      {/* ✅ 백분율 차트 (도넛 그래프) */}
      <div className="percentage-section">
        <h3>백분율</h3>
        <div className="chart-container">
          <Doughnut data={doughnutChartData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      </div>

      {/* ✅ 코멘트 입력창 (UI 개선) */}
      <div className="comment-input-container">
        <input
          type="text"
          placeholder="코멘트를 입력하세요..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={addComment} className="comment-add-button">➕</button>
      </div>

      {/* ✅ 저장된 코멘트 리스트 (최근 3개) */}
      <div className="comment-list">
        <h3>환자 코멘트 (최근 3개)</h3>
        <ul>
          {comments.map((comment, index) => (
            <li key={index} className="comment-item">
              <p>{comment.text}</p>
              <small>{comment.date}</small>
            </li>
          ))}
        </ul>
      </div>


      {/* ✅ 코멘트 페이지로 이동 (해당 환자의 코멘트만 보이도록 설정) */}
      <button onClick={() => navigate(`/commentsPage?patient=${patient.name}`)} className="comment-view-button">
        모든 코멘트 보기
      </button>
    </div>
  );
};

export default PatientDetails;
