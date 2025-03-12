import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SurveySection1.css';
import './SurveySection3.css';  // 공통 CSS 추가

const SurveySection6 = () => {
  const navigate = useNavigate();
  const [patientInfo, setPatientInfo] = useState(null);
  const [answers, setAnswers] = useState({
    question1: '',
    question2: '',
    question3: '',
    question4: '',
    question5: '',
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
        <p>암 이후 탄력성 및 미래 계획</p>
        <div className="patient-info-summary">
          <p><strong>{patientInfo.name}</strong>님의 설문조사입니다.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="survey-form">
        <div className="question-item">
          <p className="question">29. 암 치료가 끝났지만, 여전히 건강관리는 중요하다.</p>
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
          <p className="question">30. 나는 암을 잘 견뎌냈다는 자신감이 있다.</p>
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
          <p className="question">31. 암 발병 후, 내 인생을 긍정적으로 보고 있다.</p>
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

        {/* 추가된 질문 4 */}
        <div className="question-item">
          <p className="question">32. 퇴원 후 삶의 목표가 있다.</p>
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

        {/* 추가된 질문 5 */}
        <div className="question-item">
          <p className="question">33. 향후 건강과 관련하여 긍정적인 변화를 만들 준비가 되어 있다.</p>
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

        <div className="navigation-buttons">
          <button type="button" onClick={() => navigate('/survey/section5')} className="back-button">이전</button>
          <button type="submit" className="next-button">설문 제출하기</button>
        </div>
      </form>
    </div>
  );
};

export default SurveySection6;
