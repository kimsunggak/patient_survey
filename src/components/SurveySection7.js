import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SurveySection1.css';

const SurveySection7 = () => {
  const navigate = useNavigate();
  const [patientInfo, setPatientInfo] = useState(null);
  const [answers, setAnswers] = useState({
    question1: '',
    question2: '',
    question3: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [surveyCompleted, setSurveyCompleted] = useState(false);
  const [surveyResult, setSurveyResult] = useState({
    totalScore: 0,
    message: '',
    recommendations: []
  });

  useEffect(() => {
    const storedPatientInfo = localStorage.getItem('patientInfo');
    if (storedPatientInfo) {
      setPatientInfo(JSON.parse(storedPatientInfo));
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnswers({
      ...answers,
      [name]: value,
    });
  };

  const calculateResults = () => {
    // 모든 섹션의 답변 가져오기
    const section1 = JSON.parse(localStorage.getItem('surveySection1') || '{}');
    const section2 = JSON.parse(localStorage.getItem('surveySection2') || '{}');
    const section3 = JSON.parse(localStorage.getItem('surveySection3') || '{}');
    const section4 = JSON.parse(localStorage.getItem('surveySection4') || '{}');
    const section5 = JSON.parse(localStorage.getItem('surveySection5') || '{}');
    const section6 = JSON.parse(localStorage.getItem('surveySection6') || '{}');
    const section7 = answers;

    // 모든 답변의 값을 숫자로 변환하여 합산
    const allAnswers = [
      ...Object.values(section1),
      ...Object.values(section2),
      ...Object.values(section3),
      ...Object.values(section4),
      ...Object.values(section5),
      ...Object.values(section6),
      ...Object.values(section7)
    ].map(val => parseInt(val) || 0);

    const totalScore = allAnswers.reduce((sum, val) => sum + val, 0);
    const maxPossibleScore = allAnswers.length * 5; // 각 질문당 최대 점수는 5점
    const percentageScore = (totalScore / maxPossibleScore) * 100;

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

    return {
      totalScore: percentageScore.toFixed(1),
      message,
      recommendations
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // 답변 저장
    localStorage.setItem('surveySection7', JSON.stringify(answers));
    
    // 결과 계산
    const results = calculateResults();
    setSurveyResult(results);
    setSurveyCompleted(true);
    setIsSubmitting(false);
  };

  if (!patientInfo) return <div className="loading">로딩 중...</div>;

  return (
    <div className="survey-container">
      {!surveyCompleted ? (
        <>
          <div className="survey-header">
            <h1>설문조사: 섹션 7</h1>
            <p>미래 계획 및 목표</p>
            <div className="patient-info-summary">
              <p><strong>{patientInfo.name}</strong>님의 설문조사입니다.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="survey-form">
            <div className="question-item">
              <p className="question">1. 퇴원 후 삶의 목표가 있으십니까?</p>
              <div className="radio-group">
                <label>
                  <input 
                    type="radio" 
                    name="question1" 
                    value="5" 
                    onChange={handleChange} 
                    required 
                  />
                  매우 구체적인 목표가 있음
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="question1" 
                    value="4" 
                    onChange={handleChange} 
                  />
                  목표가 있음
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="question1" 
                    value="3" 
                    onChange={handleChange} 
                  />
                  보통
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="question1" 
                    value="2" 
                    onChange={handleChange} 
                  />
                  모호한 목표만 있음
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="question1" 
                    value="1" 
                    onChange={handleChange} 
                  />
                  목표가 전혀 없음
                </label>
              </div>
            </div>

            <div className="question-item">
              <p className="question">2. 향후 건강과 관련하여 긍정적인 변화를 만들 준비가 되어 있습니까?</p>
              <div className="radio-group">
                <label>
                  <input 
                    type="radio" 
                    name="question2" 
                    value="5" 
                    onChange={handleChange} 
                    required 
                  />
                  매우 그렇다
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="question2" 
                    value="4" 
                    onChange={handleChange} 
                  />
                  그렇다
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="question2" 
                    value="3" 
                    onChange={handleChange} 
                  />
                  보통이다
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="question2" 
                    value="2" 
                    onChange={handleChange} 
                  />
                  그렇지 않다
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="question2" 
                    value="1" 
                    onChange={handleChange} 
                  />
                  매우 그렇지 않다
                </label>
              </div>
            </div>

            <div className="question-item">
              <p className="question">3. 이 설문조사가 귀하의 퇴원 준비에 도움이 되었습니까?</p>
              <div className="radio-group">
                <label>
                  <input 
                    type="radio" 
                    name="question3" 
                    value="5" 
                    onChange={handleChange} 
                    required 
                  />
                  매우 도움이 됨
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="question3" 
                    value="4" 
                    onChange={handleChange} 
                  />
                  도움이 됨
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="question3" 
                    value="3" 
                    onChange={handleChange} 
                  />
                  보통
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="question3" 
                    value="2" 
                    onChange={handleChange} 
                  />
                  도움이 되지 않음
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="question3" 
                    value="1" 
                    onChange={handleChange} 
                  />
                  전혀 도움이 되지 않음
                </label>
              </div>
            </div>

            <div className="navigation-buttons">
              <button type="button" onClick={() => navigate('/survey/section6')} className="back-button">이전</button>
              <button type="submit" className="next-button" disabled={isSubmitting}>
                {isSubmitting ? '제출 중...' : '설문 제출하기'}
              </button>
            </div>
          </form>
        </>
      ) : (
        <div className="survey-result">
          <h1>설문조사 결과</h1>
          <div className="patient-info-summary">
            <p><strong>{patientInfo.name}</strong>님의 설문조사 결과입니다.</p>
          </div>

          <div className="result-score">
            <h2>종합 점수: <span className="score-value">{surveyResult.totalScore}%</span></h2>
            <p className="result-message">상태: <strong>{surveyResult.message}</strong></p>
          </div>

          <div className="result-recommendations">
            <h3>권장사항:</h3>
            <ul>
              {surveyResult.recommendations.map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          </div>

          <div className="navigation-buttons">
            <button type="button" onClick={() => navigate('/')} className="back-button">
              처음으로 돌아가기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SurveySection7;
