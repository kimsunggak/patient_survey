import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SurveySection1.css';
import './SurveySection3.css';  // 공통 CSS 추가

const SurveySection5 = () => {
  const navigate = useNavigate();
  const [patientInfo, setPatientInfo] = useState(null);
  const [answers, setAnswers] = useState({
    question1: '',
    question2: '',
    question3: '',
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

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('surveySection5', JSON.stringify(answers));
    navigate('/survey/section6');
  };

  if (!patientInfo) return <div className="loading">로딩 중...</div>;

  return (
    <div className="survey-container">
      <div className="survey-header">
        <h1>설문조사: 섹션 5</h1>
        <p>사회적 삶의 부담</p>
        <div className="patient-info-summary">
          <p><strong>{patientInfo.name}</strong>님의 설문조사입니다.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="survey-form">
        <div className="question-item">
          <p className="question">26. 암 발병 전과 비교해서 다른 사람(예: 친구,직장 동료 등)과 잘 어울리지 못한다.</p>
          <div className="radio-group">
            <label>
              <input 
                type="radio" 
                name="question1" 
                value="5" 
                onChange={handleChange} 
                required 
              />
              매우 그렇다
            </label>
            <label>
              <input 
                type="radio" 
                name="question1" 
                value="4" 
                onChange={handleChange} 
              />
              약간 그렇다
            </label>
            <label>
              <input 
                type="radio" 
                name="question1" 
                value="3" 
                onChange={handleChange} 
              />
              보통이다
            </label>
            <label>
              <input 
                type="radio" 
                name="question1" 
                value="2" 
                onChange={handleChange} 
              />
              약간 그렇지 않다
            </label>
            <label>
              <input 
                type="radio" 
                name="question1" 
                value="1" 
                onChange={handleChange} 
              />
              전혀 그렇지 않다
            </label>
          </div>
        </div>

        <div className="question-item">
          <p className="question">27. 암 발병 전과 비교해서 사회생활(예: 취미, 봉사 활동, 직장 등)을 하는데 어려움을 느낀다.</p>
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
              약간 그렇다
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
              약간 그렇지 않다
            </label>
            <label>
              <input 
                type="radio" 
                name="question2" 
                value="1" 
                onChange={handleChange} 
              />
              전혀 그렇지 않다
            </label>
          </div>
        </div>

        <div className="question-item">
          <p className="question">28. 암 발병으로 인해 취직, 직장복귀 및 적응(예 : 업무시간, 업무량, 업무 질 등)에 부담감을 느낀다.</p>
          <div className="radio-group">
            <label>
              <input 
                type="radio" 
                name="question3" 
                value="5" 
                onChange={handleChange} 
                required 
              />
              매우 그렇다
            </label>
            <label>
              <input 
                type="radio" 
                name="question3" 
                value="4" 
                onChange={handleChange} 
              />
              약간 그렇다
            </label>
            <label>
              <input 
                type="radio" 
                name="question3" 
                value="3" 
                onChange={handleChange} 
              />
              보통이다
            </label>
            <label>
              <input 
                type="radio" 
                name="question3" 
                value="2" 
                onChange={handleChange} 
              />
              약간 그렇지 않다
            </label>
            <label>
              <input 
                type="radio" 
                name="question3" 
                value="1" 
                onChange={handleChange} 
              />
              전혀 그렇지 않다
            </label>
          </div>
        </div>

        <div className="navigation-buttons">
          <button type="button" onClick={() => navigate('/survey/section4')} className="back-button">이전</button>
          <button type="submit" className="next-button">다음</button>
        </div>
      </form>
    </div>
  );
};

export default SurveySection5;
