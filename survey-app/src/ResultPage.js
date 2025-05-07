import React from "react";
import { getPatientComment, getPatientExtraComment } from "./SurveyUtils";

function ResultPage({ totalScore, sectionScores, totalGroup, onBack, reason12_1 }) {
  const mainComment = getPatientComment(totalGroup);
  const extraComment = getPatientExtraComment(reason12_1);
  return (
    <div style={{ padding: 24 }}>
      <h2>설문조사 결과</h2>
      <div style={{ marginBottom: 16 }}>
        <strong>총합 점수:</strong> {totalScore}
      </div>
      <div style={{ marginBottom: 16 }}>
        <strong>전체 평균 집단:</strong> {totalGroup}
      </div>
      <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", marginBottom: 24 }}>
        <thead>
          <tr>
            <th>섹션</th>
            <th>점수 합계</th>
            <th>집단</th>
          </tr>
        </thead>
        <tbody>
          {sectionScores.map((score, idx) => (
            <tr key={idx}>
              <td>{score.section}</td>
              <td>{score.score}</td>
              <td>{score.group}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* 메인 코멘트 */}
      <div style={{
        border: '2px solid #1976d2',
        background: '#e3f2fd',
        borderRadius: 8,
        padding: 20,
        marginBottom: 16,
        color: '#0d47a1',
        fontWeight: 'bold',
        fontSize: 16
      }}>
        {mainComment}
      </div>
      {/* 추가 안내 코멘트가 있을 때만 별도 공간에 표시 */}
      {extraComment && (
        <div style={{
          border: '2px dashed #d32f2f',
          background: '#ffebee',
          borderRadius: 8,
          padding: 16,
          marginBottom: 24,
          color: '#b71c1c',
          fontWeight: 'bold',
          fontSize: 15
        }}>
          {extraComment}
        </div>
      )}
      <button onClick={onBack}>설문 다시하기</button>
    </div>
  );
}

export default ResultPage;
