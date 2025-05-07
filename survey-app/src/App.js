// react 컴포넌트 불러오기
import React from 'react';
// 이 컴포넌트 전용 스타일 지정
import './App.css';
// 설문 입력 폼과 결과 페이지 컴포넌트 불러오기
import SurveyForm from "./SurveyForm";
import ResultPage from "./ResultPage";
// 알고리즘/역코딩 함수 불러오기
import { applyReverseScore } from "./SurveyUtils";

function App() {
  // 설문 결과를 저장할 상태 변수
  // const : javascript에서 재할당이 불가능한 변수를 선언할 때 사용
  // 초깃값은 null이었다가 설문을 제출하면 totalScore와 sectionScores형태의 객체로 바뀜
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

  // 설문 제출 시 호출되는 함수
  const handleSurveySubmit = (answers) => {
    const rescore = applyReverseScore(answers); // 역코딩 적용
    // 전체 점수 계산 - 집단을 나누기 위함
    let total = 0;
    // 각 섹션 배열을 순회하면서 각 섹션별 점수를 계산해 sectionScores 배열에 저장
    const sectionScores = sectionIds.map((ids, idx) => {
      const sum = ids.reduce((acc, id) => acc + (parseInt(rescore[id]) || 0), 0);
      total += sum;
      return { section: sectionNames[idx], score: sum };
    });
    // 결과 상태 저장
    setResult({ totalScore: total, sectionScores });
  };
  // 설문 조사 다시하기 버튼누르면 호출되는 함수
  const handleBack = () => setResult(null);
  // JSX(JavaScript XML)를 반환해 UI를 그림
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
