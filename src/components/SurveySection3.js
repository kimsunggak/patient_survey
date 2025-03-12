import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SurveySection1.css';
import './SurveySection3.css';  // 추가된 CSS import

const SurveySection3 = () => {
  const navigate = useNavigate();
  const [patientInfo, setPatientInfo] = useState(null);
  const [answers, setAnswers] = useState({
    question1: '',
    question2: '',
    question3: '',
    question4: '',
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

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    if (checked) {
      setAnswers({
        ...answers,
        [name]: [...(answers[name] || []), value],
      });
    } else {
      setAnswers({
        ...answers,
        [name]: answers[name].filter((item) => item !== value),
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('surveySection3', JSON.stringify(answers));
    navigate('/survey/section4');
  };

  if (!patientInfo) return <div className="loading">로딩 중...</div>;

  return (
    <div className="survey-container">
      <div className="survey-header">
        <h1>설문조사: 섹션 3</h1>
        <p>회복하도록 도와주는 사람들</p>
        <div className="patient-info-summary">
          <p><strong>{patientInfo.name}</strong>님의 설문조사입니다.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="survey-form">
        <div className="question-item">
          <p className="question">14. 우리 가족은 나에게 실질적인 도움을 주고 있다.</p>
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
          <p className="question">15. 우리 가족은 나에게 충분한 관심과 사랑을 주고 있다.</p>
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

        <div className="question-item sub-question">
          <p className="question">15-1. 👉 귀하께서 가족으로부터 관심과 도움을 받고 있지 않다면, 다음 중 무엇 때문이라고 생각하십니까? (해당되는 것에 모두 체크해 주세요. 만약 귀하께서 가족으로부터 충분한 관심과 도움을 받고 있다면 16번으로 넘어가 주세요.)</p>
          <div className="checkbox-group">
            <label>
              <input 
                type="checkbox" 
                name="question2_1" 
                value="가족의 도움에 대한 기대감이 낮아서" 
                onChange={handleCheckboxChange} 
              />
              1) 가족의 도움에 대한 기대감이 낮아서
            </label>
            <label>
              <input 
                type="checkbox" 
                name="question2_1" 
                value="현실적으로 챙겨줄 수 있는 가족이 없어서" 
                onChange={handleCheckboxChange} 
              />
              2) 현실적으로 챙겨줄 수 있는 가족이 없어서
            </label>
            <label>
              <input 
                type="checkbox" 
                name="question2_1" 
                value="가족이 바빠서" 
                onChange={handleCheckboxChange} 
              />
              3) 가족이 바빠서
            </label>
            <label>
              <input 
                type="checkbox" 
                name="question2_1" 
                value="가족의 무심한 성격 때문에" 
                onChange={handleCheckboxChange} 
              />
              4) 가족의 무심한 성격 때문에
            </label>
            <label>
              <input 
                type="checkbox" 
                name="question2_1" 
                value="나를 환자로 대하지 않아서" 
                onChange={handleCheckboxChange} 
              />
              5) 나를 환자로 대하지 않아서
            </label>
            <div className="other-option">
              <div>
                <label style={{ display: 'block', marginBottom: '8px' }}>
                  6) 기타:
                </label>
                <textarea 
                  name="question2_1_other" 
                  onChange={(e) => {
                    const value = e.target.value;
                    // Remove any previous "기타" entries
                    const filteredAnswers = answers.question2_1 ? answers.question2_1.filter(item => !item.startsWith("기타: ")) : [];
                    
                    // Only add the new value if it's not empty
                    if (value.trim()) {
                      setAnswers({
                        ...answers,
                        question2_1: [...filteredAnswers, `기타: ${value}`]
                      });
                    } else {
                      setAnswers({
                        ...answers,
                        question2_1: filteredAnswers
                      });
                    }
                  }} 
                  placeholder="직접 입력해 주세요"
                  style={{
                    width: '95%',
                    height: '120px',
                    padding: '12px 15px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    fontSize: '35px',
                    display: 'block',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    resize: 'vertical',
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="question-item">
          <p className="question">16. 내 성격이 암을 견뎌내는데 도움이 되고 있다.</p>
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
          <p className="question">17. 내 친구들은 나에게 충분한 관심과 위로를 주고 있다.</p>
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

        <div className="navigation-buttons">
          <button type="button" onClick={() => navigate('/survey/section2')} className="back-button">이전</button>
          <button type="submit" className="next-button">다음</button>
        </div>
      </form>
    </div>
  );
};

export default SurveySection3;
