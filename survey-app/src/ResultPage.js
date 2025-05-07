import React from "react";

function ResultPage({ totalScore, sectionScores, totalGroup, onBack }) {
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
      <button onClick={onBack}>설문 다시하기</button>
    </div>
  );
}

export default ResultPage;
