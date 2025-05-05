import React from 'react';
import './App.css';
import SurveyForm from "./SurveyForm";
import ResultPage from "./ResultPage";

function App() {
  const [result, setResult] = React.useState(null);

  // 섹션별 문항 id 배열
  const sectionIds = [
    [1,2,3,4,5,6,7,8], // 1번 섹션
    [9,10,11,12,13],   // 2번 섹션
    [14,15,16,17],     // 3번 섹션
    [18,19,20,21,22,23,24,25], // 4번 섹션
    [26,27,28],        // 5번 섹션
    [29,30,31],        // 6번 섹션
    [32,33],           // 7번 섹션
  ];
  const sectionNames = [
    "1. 암 이후 내 몸의 변화",
    "2. 건강한 삶을 위한 관리",
    "3. 회복을 도와주는 사람들",
    "4. 심리적 부담",
    "5. 사회적 삶의 부담",
    "6. 암 이후 탄력성",
    "7. 추가 문항"
  ];

  // 설문 제출 시 결과 계산
  const handleSurveySubmit = (answers) => {
    let total = 0;
    const sectionScores = sectionIds.map((ids, idx) => {
      const sum = ids.reduce((acc, id) => acc + (parseInt(answers[id]) || 0), 0);
      total += sum;
      return { section: sectionNames[idx], score: sum };
    });
    setResult({ totalScore: total, sectionScores });
  };

  const handleBack = () => setResult(null);

  return (
    <div className="App">
      {result ? (
        <ResultPage
          totalScore={result.totalScore}
          sectionScores={result.sectionScores}
          onBack={handleBack}
        />
      ) : (
        <SurveyForm onSubmit={handleSurveySubmit} />
      )}
    </div>
  );
}

export default App;
