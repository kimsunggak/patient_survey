import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SurveySection1.css';
import './SurveySection3.css';
import './SurveySection7.css'; // 결과 페이지용 추가 스타일

const SurveySection7 = () => {
  const navigate = useNavigate();
  const [patientInfo, setPatientInfo] = useState(null);
  const [surveyResult, setSurveyResult] = useState({
    totalScore: 0,
    message: '',
    recommendations: [],
    sectionScores: {} // 섹션별 점수 추가
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedPatientInfo = localStorage.getItem('patientInfo');
    if (storedPatientInfo) {
      setPatientInfo(JSON.parse(storedPatientInfo));
      // 페이지 로드 시 즉시 결과 계산
      calculateAndSetResults();
    } else {
      navigate('/');
    }
  }, [navigate]);

  const calculateAndSetResults = () => {
    // 모든 섹션의 답변 가져오기
    const section1 = JSON.parse(localStorage.getItem('surveySection1') || '{}');
    const section2 = JSON.parse(localStorage.getItem('surveySection2') || '{}');
    const section3 = JSON.parse(localStorage.getItem('surveySection3') || '{}');
    const section4 = JSON.parse(localStorage.getItem('surveySection4') || '{}');
    const section5 = JSON.parse(localStorage.getItem('surveySection5') || '{}');
    const section6 = JSON.parse(localStorage.getItem('surveySection6') || '{}');

    // 섹션별 답변 객체 생성
    const sectionAnswers = {
      '섹션 1: 암 이후 내 몸의 변화': Object.values(section1).map(val => parseInt(val) || 0),
      '섹션 2: 건강한 삶을 위한 관리': Object.values(section2).map(val => parseInt(val) || 0).filter(val => !isNaN(val)),
      '섹션 3: 회복하도록 도와주는 사람들': Object.values(section3).map(val => parseInt(val) || 0),
      '섹션 4: 심리적 부담': Object.values(section4).map(val => parseInt(val) || 0),
      '섹션 5: 사회적 삶의 부담': Object.values(section5).map(val => parseInt(val) || 0),
      '섹션 6: 암 이후 탄력성 및 미래 계획': Object.values(section6).map(val => parseInt(val) || 0)
    };

    // 섹션별 점수 계산
    const sectionScores = {};
    let totalPoints = 0;
    let totalMaxPoints = 0;
    
    for (const [section, answers] of Object.entries(sectionAnswers)) {
      const validAnswers = answers.filter(val => val > 0); // 0이 아닌 유효한 답변만
      if (validAnswers.length > 0) {
        const sectionTotal = validAnswers.reduce((sum, val) => sum + val, 0);
        const sectionMax = validAnswers.length * 5;
        const sectionPercentage = (sectionTotal / sectionMax) * 100;
        
        sectionScores[section] = {
          score: sectionTotal,
          maxPossible: sectionMax,
          percentage: sectionPercentage.toFixed(1)
        };
        
        totalPoints += sectionTotal;
        totalMaxPoints += sectionMax;
      }
    }

    // 전체 점수 계산
    const percentageScore = totalMaxPoints > 0 ? (totalPoints / totalMaxPoints) * 100 : 0;

    // 결과 메시지 및 권장사항 설정
    let message = '';
    let recommendations = [];

    if (percentageScore >= 80) {
      message = '매우 양호함';
      recommendations = [
        '현재 상태를 유지하면서 정기적인 건강 검진을 받으세요.',
        '지속적인 자기 관리에 신경 써주세요.',
        '필요시 사회복지사와의 상담은 언제든 도움이 됩니다.'
      ];
    } else if (percentageScore >= 60) {
      message = '양호함';
      recommendations = [
        '정기적인 건강 관리가 필요합니다.',
        '사회적 지원 네트워크를 강화하세요.',
        '필요시 추가적인 의료 상담을 고려하세요.'
      ];
    } else if (percentageScore >= 40) {
      message = '보통';
      recommendations = [
        '사회복지사와의 정기적인 상담이 권장됩니다.',
        '가족 또는 친구의 지원을 적극적으로 구하세요.',
        '건강 관리를 위한 구체적인 계획을 세워보세요.'
      ];
    } else if (percentageScore >= 20) {
      message = '주의 필요';
      recommendations = [
        '사회복지사와의 정기적인 상담이 필요합니다.',
        '전문적인 의료 지원을 지속적으로 받으세요.',
        '일상생활에서 도움을 받을 수 있는 체계를 구축하세요.'
      ];
    } else {
      message = '집중 관리 필요';
      recommendations = [
        '사회복지사와의 긴급 상담이 필요합니다.',
        '전문적인 의료 및 심리상담을 받으세요.',
        '지역사회 지원 서비스를 적극적으로 활용하세요.'
      ];
    }

    // 결과 설정
    setSurveyResult({
      totalScore: percentageScore.toFixed(1),
      message,
      recommendations,
      sectionScores
    });
    
    setIsLoading(false);
  };

  if (isLoading || !patientInfo) return <div className="loading">결과 분석 중...</div>;

  return (
    <div className="survey-container">
      <div className="survey-result">
        <h1>설문조사 결과</h1>
        <div className="patient-info-summary">
          <p><strong>{patientInfo.name}</strong>님의 설문조사 결과입니다.</p>
        </div>

        <div className="result-score">
          <h2>종합 점수: <span className="score-value">{surveyResult.totalScore}%</span></h2>
          <p className="result-message">상태: <strong>{surveyResult.message}</strong></p>
        </div>

        {/* 섹션별 결과 표 추가 */}
        <div className="result-table-container">
          <h3>섹션별 결과 분석</h3>
          <table className="result-table">
            <thead>
              <tr>
                <th>카테고리</th>
                <th>점수</th>
                <th>백분율</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(surveyResult.sectionScores).map(([section, data], index) => {
                // 섹션별 상태 결정
                let status = '주의 필요';
                const percentage = parseFloat(data.percentage);
                if (percentage >= 80) status = '매우 양호';
                else if (percentage >= 60) status = '양호';
                else if (percentage >= 40) status = '보통';
                
                return (
                  <tr key={index}>
                    <td>{section}</td>
                    <td>{data.score}/{data.maxPossible}</td>
                    <td>{data.percentage}%</td>
                    <td className={`status-${status.replace(/\s+/g, '-').toLowerCase()}`}>{status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="result-recommendations">
          <h3>권장사항:</h3>
          <ul>
            {surveyResult.recommendations.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        </div>

        {/* 시각화 차트 영역 */}
        <div className="result-chart">
          <h3>섹션별 점수 비교</h3>
          <div className="bar-chart">
            {Object.entries(surveyResult.sectionScores).map(([section, data], index) => (
              <div className="chart-row" key={index}>
                <div className="chart-label">{section.split(':')[0]}</div>
                <div className="chart-bar-container">
                  <div 
                    className="chart-bar" 
                    style={{ width: `${data.percentage}%` }}
                    data-percentage={`${data.percentage}%`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="navigation-buttons">
          <button type="button" onClick={() => window.print()} className="print-button">결과 인쇄하기</button>
          <button type="button" onClick={() => navigate('/')} className="back-button">
            처음으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default SurveySection7;
