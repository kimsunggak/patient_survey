// react 컴포넌트 불러오기
import React from 'react';
// 이 컴포넌트 전용 스타일 지정
import './App.css';
// 설문 입력 폼과 결과 페이지 컴포넌트 불러오기
import SurveyForm from "./SurveyForm";
import ResultPage from "./ResultPage";
// 알고리즘/역코딩 함수 불러오기
import * as SurveyUtils from "./SurveyUtils";


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
    [29,30,31,32,33],  // 6+7번 섹션(합침)
  ];
  const sectionNames = [
    "암 이후 내 몸의 변화",
    "건강한 삶을 위한 관리",
    "회복을 도와주는 사람들",
    "심리적 부담",
    "사회적 삶의 부담",
    "암 이후 탄력성 및 추가 문항"
  ];

  // 설문 제출 시 호출되는 함수
  const handleSurveySubmit = (answers) => {
    const rescore = SurveyUtils.applyReverseScore(answers); // 역코딩 적용
    let total = 0;
    // 전체 평균 점수에 대한 집단 분류를 위한 변수
    let meanSum = 0;
    
    const sectionScores = sectionIds.map((ids, idx) => {
      const sum = ids.reduce((acc, id) => acc + (parseInt(rescore[id]) || 0), 0);
      // 섹션별 평균점수(합계/문항수)
      const meanScore = sum / ids.length;
      // 변환전의 점수로 범위를 나눠야 함
      meanSum += meanScore;
      // 변환 점수 계산
      const convertedScore = SurveyUtils.newScore(sectionNames[idx], meanScore);
      total += convertedScore;
      const group = SurveyUtils.getRiskGroup(sectionNames[idx], meanScore); 
      return { section: sectionNames[idx],group: group,score: convertedScore };
    });
    const totalMeanScore = meanSum / sectionScores.length;
    const totalScore = Math.round(total / sectionScores.length); // 전체 평균(반올림)
    // 전체 평균 점수에 대한 집단 분류 추가
    const totalGroup = SurveyUtils.getRiskGroup("전체 평균 (암 생존자 건강관리)", totalMeanScore);
    setResult({ totalScore, sectionScores, totalGroup });
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
          totalGroup={result.totalGroup}
          onBack={handleBack}
        />
      ) : (
        <SurveyForm onSubmit={handleSurveySubmit} />
      )}
    </div>
  );
}

export default App;
