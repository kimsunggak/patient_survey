import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SurveySection1.css';

const SurveySection1 = () => {
  const navigate = useNavigate();
  const [patientInfo, setPatientInfo] = useState(null);
  const [answers, setAnswers] = useState({
    question1: '',
    question2: '',
    question3: '',
    question4: '',
    question5: '',
    question6: '',
    question7: '',
    question8: '',
  });

  useEffect(() => {
    // 로컬 스토리지에서 환자 정보 가져오기
    const storedPatientInfo = localStorage.getItem('patientInfo');
    if (storedPatientInfo) {
      setPatientInfo(JSON.parse(storedPatientInfo));
    } else {
      // 환자 정보가 없으면 첫 페이지로 리다이렉트
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
    
    // 응답 저장
    localStorage.setItem('surveySection1', JSON.stringify(answers));
    
    // 다음 섹션으로 이동
    navigate('/survey/section2');
  };

  if (!patientInfo) return <div className="loading">로딩 중...</div>;

  return (
    <div className="survey-container">
      <div className="survey-header">
        <h1>설문조사: 섹션 1</h1>
        <p>암 이후 내 몸의 변화</p>
        <div className="patient-info-summary">
          <p><strong>{patientInfo.name}</strong>님의 설문조사입니다.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="survey-form">
        <div className="question-item">
          <p className="question">1. 암 발병 전과 비교해서 무언가에 집중하기 어렵다.</p>
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
          <p className="question">2. 암 발병 전과 비교해서 무언가를 기억하는데 어려움이 있다.</p>
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
          <p className="question">3. 암 발병 전과 비교해서 성생활에 어려움을 느낀다.</p>
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

        <div className="question-item">
          <p className="question">4. 암 치료 이후 현재 우울감을 느낀다.</p>
          <div className="radio-group">
            <label>
              <input 
                type="radio" 
                name="question4" 
                value="5" 
                onChange={handleChange} 
                required 
              />
              매우 그렇다
            </label>
            <label>
              <input 
                type="radio" 
                name="question4" 
                value="4" 
                onChange={handleChange} 
              />
              약간 그렇다
            </label>
            <label>
              <input 
                type="radio" 
                name="question4" 
                value="3" 
                onChange={handleChange} 
              />
              보통이다
            </label>
            <label>
              <input 
                type="radio" 
                name="question4" 
                value="2" 
                onChange={handleChange} 
              />
              약간 그렇지 않다
            </label>
            <label>
              <input 
                type="radio" 
                name="question4" 
                value="1" 
                onChange={handleChange} 
              />
              전혀 그렇지 않다
            </label>
          </div>
        </div>

        <div className="question-item">
          <p className="question">5. 암 발병 이후, 수면에 어려움이 있다.</p>
          <div className="radio-group">
            <label>
              <input 
                type="radio" 
                name="question5" 
                value="5" 
                onChange={handleChange} 
                required 
              />
              매우 그렇다
            </label>
            <label>
              <input 
                type="radio" 
                name="question5" 
                value="4" 
                onChange={handleChange} 
              />
              약간 그렇다
            </label>
            <label>
              <input 
                type="radio" 
                name="question5" 
                value="3" 
                onChange={handleChange} 
              />
              보통이다
            </label>
            <label>
              <input 
                type="radio" 
                name="question5" 
                value="2" 
                onChange={handleChange} 
              />
              약간 그렇지 않다
            </label>
            <label>
              <input 
                type="radio" 
                name="question5" 
                value="1" 
                onChange={handleChange} 
              />
              전혀 그렇지 않다
            </label>
          </div>
        </div>

        <div className="question-item">
          <p className="question">6. 암 치료로 인해 일상생활에 불편함(예: 부종, 경직 등)을 느낀다.</p>
          <div className="radio-group">
            <label>
              <input 
                type="radio" 
                name="question6" 
                value="5" 
                onChange={handleChange} 
                required 
              />
              매우 그렇다
            </label>
            <label>
              <input 
                type="radio" 
                name="question6" 
                value="4" 
                onChange={handleChange} 
              />
              약간 그렇다
            </label>
            <label>
              <input 
                type="radio" 
                name="question6" 
                value="3" 
                onChange={handleChange} 
              />
              보통이다
            </label>
            <label>
              <input 
                type="radio" 
                name="question6" 
                value="2" 
                onChange={handleChange} 
              />
              약간 그렇지 않다
            </label>
            <label>
              <input 
                type="radio" 
                name="question6" 
                value="1" 
                onChange={handleChange} 
              />
              전혀 그렇지 않다
            </label>
          </div>
        </div>

        <div className="question-item">
          <p className="question">7. 체력 저하로 인해 피로감을 느낀다.</p>
          <div className="radio-group">
            <label>
              <input 
                type="radio" 
                name="question7" 
                value="5" 
                onChange={handleChange} 
                required 
              />
              매우 그렇다
            </label>
            <label>
              <input 
                type="radio" 
                name="question7" 
                value="4" 
                onChange={handleChange} 
              />
              약간 그렇다
            </label>
            <label>
              <input 
                type="radio" 
                name="question7" 
                value="3" 
                onChange={handleChange} 
              />
              보통이다
            </label>
            <label>
              <input 
                type="radio" 
                name="question7" 
                value="2" 
                onChange={handleChange} 
              />
              약간 그렇지 않다
            </label>
            <label>
              <input 
                type="radio" 
                name="question7" 
                value="1" 
                onChange={handleChange} 
              />
              전혀 그렇지 않다
            </label>
          </div>
        </div>

        <div className="question-item">
          <p className="question">8. 암 발병 전과 비교해서 적정 체중을 유지하기 어렵다.</p>
          <div className="radio-group">
            <label>
              <input 
                type="radio" 
                name="question8" 
                value="5" 
                onChange={handleChange} 
                required 
              />
              매우 그렇다
            </label>
            <label>
              <input 
                type="radio" 
                name="question8" 
                value="4" 
                onChange={handleChange} 
              />
              약간 그렇다
            </label>
            <label>
              <input 
                type="radio" 
                name="question8" 
                value="3" 
                onChange={handleChange} 
              />
              보통이다
            </label>
            <label>
              <input 
                type="radio" 
                name="question8" 
                value="2" 
                onChange={handleChange} 
              />
              약간 그렇지 않다
            </label>
            <label>
              <input 
                type="radio" 
                name="question8" 
                value="1" 
                onChange={handleChange} 
              />
              전혀 그렇지 않다
            </label>
          </div>
        </div>

        <div className="navigation-buttons">
          <button type="button" onClick={() => navigate('/')} className="back-button">이전</button>
          <button type="submit" className="next-button">다음</button>
        </div>
      </form>
    </div>
  );
};

export default SurveySection1;
