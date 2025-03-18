import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend } from "chart.js";
import "./PatientDetails.css";

ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const PatientDetails = ({ patientData, onSelectSidebar = () => {} }) => {
  const { id } = useParams();
  const patient = patientData.find((p) => p.id === parseInt(id));

  const [comments, setComments] = useState([]);

  useEffect(() => {
    onSelectSidebar("patientInfo");

    // ✅ 로컬 스토리지에서 환자별 코멘트 불러오기
    const storedComments = JSON.parse(localStorage.getItem("comments")) || {};
    setComments(storedComments[patient.name] || []);
  }, [onSelectSidebar, patient.name]);

  // ✅ 섹션별 데이터 (예제 평균값 포함)
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

  // ✅ 막대 그래프 데이터 추가
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

  // ✅ 원형 그래프 데이터 추가
  const doughnutChartData = {
    labels: sectionLabels,
    datasets: [
      {
        data: patientScores,
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"],
      },
    ],
  };

  // ✅ 팝업 열기 함수
  const openCommentPopup = () => {
    const popup = window.open("", "_blank", "width=500,height=500");
    if (popup) {
      popup.document.write(`
        <html>
          <head>
            <title>코멘트 입력</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              textarea { width: 100%; height: 80px; margin-bottom: 10px; }
              button { padding: 10px; background-color: #007bff; color: white; border: none; cursor: pointer; }
            </style>
          </head>
          <body>
            <h2>코멘트 입력</h2>
            <textarea id="commentInput"></textarea>
            <button id="submitComment">등록</button>
            <script>
              document.getElementById("submitComment").addEventListener("click", function() {
                const comment = document.getElementById("commentInput").value;
                if (comment.trim()) {
                  window.opener.postMessage({ patientName: "${patient.name}", comment: comment }, "*");
                  window.close();
                }
              });
            </script>
          </body>
        </html>
      `);
    }
  };

   // ✅ 코멘트 저장 (팝업에서 메시지 수신)
   useEffect(() => {
    const handleCommentMessage = (event) => {
      if (event.data.patientName === patient.name) {
        const storedComments = JSON.parse(localStorage.getItem("comments")) || {};
        const updatedComments = [...(storedComments[patient.name] || []), event.data.comment];

        storedComments[patient.name] = updatedComments;
        localStorage.setItem("comments", JSON.stringify(storedComments));

        setComments(updatedComments);
      }
    };
    window.addEventListener("message", handleCommentMessage);
    return () => window.removeEventListener("message", handleCommentMessage);
  }, [comments, patient.name]);

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

      {/* ✅ 결과 분석 차트 */}
      <div className="analysis-section">
        <h3>결과 분석</h3>
        <Bar data={barChartData} />
      </div>

      {/* ✅ 백분율 차트 */}
      <div className="percentage-section">
        <h3>백분율</h3>
        <Doughnut data={doughnutChartData} />
      </div>

      {/* ✅ 팝업으로 코멘트 입력 */}
      <button className="comments-button" onClick={openCommentPopup}>✏️ Comments</button>

      {/* ✅ 저장된 코멘트 리스트 */}
      <div className="comment-list">
        <h3>환자 코멘트</h3>
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PatientDetails;
