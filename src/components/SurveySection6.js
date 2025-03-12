import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SurveySection1.css';

const SurveySection6 = () => {
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
    localStorage.setItem('surveySection6', JSON.stringify(answers));
    navigate('/survey/section7');
  };

  if (!patientInfo) return <div className="loading">로딩 중...</div>;

  return (
    <div className="survey-container">
      <div className="survey-header">
        <h1>설문조사: 섹션 6</h1>
        <p>의료 정보 및 관리</p>
        <div className="patient-info-summary">
          <p><strong>{patientInfo.name}</strong>님의 설문조사입니다.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="survey-form">
        <div className="question-item">
          <p className="question">1. 퇴원 후 정기적으로 병원에 방문할 계획이 있으십니까?</p>
          <div className="radio-group">
            <label>
              <input 
                type="radio" 
                name="question1" 
                value="5" 
                onChange={handleChange} 
                required 
              />
              매우 그렇다 (구체적인 일정이 있음)
            </label>
            <label>
              <input 
                type="radio" 
                name="question1" 
                value="4" 
                onChange={handleChange} 
              />
              그렇다 (대략적인 일정이 있음)
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
              그렇지 않다 (계획이 불확실함)
            </label>
            <label>
              <input 
                type="radio" 
                name="question1" 
                value="1" 
                onChange={handleChange} 
              />
              매우 그렇지 않다 (계획이 전혀 없음)
            </label>
          </div>
        </div>

        <div className="question-item">
          <p className="question">2. 귀하의 질병과 치료에 대해 얼마나 잘 이해하고 있습니까?</p>
          <div className="radio-group">
            <label>
              <input 
                type="radio" 
                name="question2" 
                value="5" 
                onChange={handleChange} 
                required 
              />
              매우 잘 이해함
            </label>
            <label>
              <input 
                type="radio" 
                name="question2" 
                value="4" 
                onChange={handleChange} 
              />
              잘 이해함
            </label>
            <label>
              <input 
                type="radio" 
                name="question2" 
                value="3" 
                onChange={handleChange} 
              />
              보통
            </label>
            <label>
              <input 
                type="radio" 
                name="question2" 
                value="2" 
                onChange={handleChange} 
              />
              잘 이해하지 못함
            </label>
            <label>
              <input 
                type="radio" 
                name="question2" 
                value="1" 
                onChange={handleChange} 
              />
              전혀 이해하지 못함
            </label>
          </div>
        </div>

        <div className="question-item">
          <p className="question">3. 건강 관리를 위한 식이요법에 대해 얼마나 잘 알고 있습니까?</p>
          <div className="radio-group">
            <label>
              <input 
                type="radio" 
                name="question3" 
                value="5" 
                onChange={handleChange} 
                required 
              />
              매우 잘 알고 있음
            </label>
            <label>
              <input 
                type="radio" 
                name="question3" 
                value="4" 
                onChange={handleChange} 
              />
              잘 알고 있음
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
              잘 모름
            </label>
            <label>
              <input 
                type="radio" 
                name="question3" 
                value="1" 
                onChange={handleChange} 
              />
              전혀 모름
            </label>
          </div>
        </div>

        <div className="navigation-buttons">
          <button type="button" onClick={() => navigate('/survey/section5')} className="back-button">이전</button>
          <button type="submit" className="next-button">다음</button>
        </div>
      </form>
    </div>
  );
};

export default SurveySection6;
