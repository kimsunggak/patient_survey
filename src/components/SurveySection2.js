import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SurveySection1.css';
import './SurveySection2.css';

const SurveySection2 = () => {
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
    question9: '',
    question10: '',
    question11: '',
    question12: '',
    question12_1: [],
    question13: '',
    question13_1: []
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
        [name]: [...(answers[name] || []), value]
      });
    } else {
      setAnswers({
        ...answers,
        [name]: (answers[name] || []).filter(item => item !== value)
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('surveySection2', JSON.stringify(answers));
    navigate('/survey/section3');
  };

  if (!patientInfo) return <div className="loading">로딩 중...</div>;

  return (
    <div className="survey-container">
      <div className="survey-header">
        <h1>설문조사: 섹션 2</h1>
        <p>건강한 삶을 위한 관리</p>
        <div className="patient-info-summary">
          <p><strong>{patientInfo.name}</strong>님의 설문조사입니다.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="survey-form">
        <div className="question-item">
          <p className="question">9. 여러 가지 식품군을 골고루 섭취한다 (예: 균형식).</p>
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
          <p className="question">10. 암 진단 및 치료 이후, 규칙적인 운동을 하고 있다.</p>
          <div className="radio-group">
            <label>
              <input 
                type="radio" 
                name="question9" 
                value="5" 
                onChange={handleChange} 
                required 
              />
              매우 그렇다
            </label>
            <label>
              <input 
                type="radio" 
                name="question9" 
                value="4" 
                onChange={handleChange} 
              />
              약간 그렇다
            </label>
            <label>
              <input 
                type="radio" 
                name="question9" 
                value="3" 
                onChange={handleChange} 
              />
              보통이다
            </label>
            <label>
              <input 
                type="radio" 
                name="question9" 
                value="2" 
                onChange={handleChange} 
              />
              약간 그렇지 않다
            </label>
            <label>
              <input 
                type="radio" 
                name="question9" 
                value="1" 
                onChange={handleChange} 
              />
              전혀 그렇지 않다
            </label>
          </div>
        </div>

        <div className="question-item">
          <p className="question">11. 규칙적인 식사를 한다.</p>
          <div className="radio-group">
            <label>
              <input 
                type="radio" 
                name="question10" 
                value="5" 
                onChange={handleChange} 
                required 
              />
              매우 그렇다
            </label>
            <label>
              <input 
                type="radio" 
                name="question10" 
                value="4" 
                onChange={handleChange} 
              />
              약간 그렇다
            </label>
            <label>
              <input 
                type="radio" 
                name="question10" 
                value="3" 
                onChange={handleChange} 
              />
              보통이다
            </label>
            <label>
              <input 
                type="radio" 
                name="question10" 
                value="2" 
                onChange={handleChange} 
              />
              약간 그렇지 않다
            </label>
            <label>
              <input 
                type="radio" 
                name="question10" 
                value="1" 
                onChange={handleChange} 
              />
              전혀 그렇지 않다
            </label>
          </div>
        </div>

        <div className="question-item">
          <p className="question">12. 나는 내가 생각한 건강관리 방법을 잘 실천하고 있다.</p>
          <div className="radio-group">
            <label>
              <input 
                type="radio" 
                name="question11" 
                value="5" 
                onChange={handleChange} 
                required 
              />
              매우 그렇다
            </label>
            <label>
              <input 
                type="radio" 
                name="question11" 
                value="4" 
                onChange={handleChange} 
              />
              약간 그렇다
            </label>
            <label>
              <input 
                type="radio" 
                name="question11" 
                value="3" 
                onChange={handleChange} 
              />
              보통이다
            </label>
            <label>
              <input 
                type="radio" 
                name="question11" 
                value="2" 
                onChange={handleChange} 
              />
              약간 그렇지 않다
            </label>
            <label>
              <input 
                type="radio" 
                name="question11" 
                value="1" 
                onChange={handleChange} 
              />
              전혀 그렇지 않다
            </label>
          </div>
        </div>

        <div className="question-item sub-question">
          <p className="question">12-1. 👉 건강관리를 잘 하고 있지 못한다면, 다음 중 무엇 때문입니까? (해당되는 것에 모두 체크해 주세요. 건강관리를 잘하고 있다면 26번으로 넘어가 주세요.)</p>
          <div className="checkbox-group">
            <label>
              <input 
                type="checkbox" 
                name="question12_1" 
                value="무엇을 해야 할지 몰라서" 
                onChange={handleCheckboxChange} 
              />
              1) 무엇을 해야 할지 몰라서
            </label>
            <label>
              <input 
                type="checkbox" 
                name="question12_1" 
                value="건강관리 자체를 스트레스라고 생각해서" 
                onChange={handleCheckboxChange} 
              />
              2) 건강관리 자체를 스트레스라고 생각해서
            </label>
            <label>
              <input 
                type="checkbox" 
                name="question12_1" 
                value="의지가 없어서" 
                onChange={handleCheckboxChange} 
              />
              3) 의지가 없어서
            </label>
            <label>
              <input 
                type="checkbox" 
                name="question12_1" 
                value="시간이 많이 걸려서" 
                onChange={handleCheckboxChange} 
              />
              4) 시간이 많이 걸려서
            </label>
            <label>
              <input 
                type="checkbox" 
                name="question12_1" 
                value="가족이 도와주지 않아서" 
                onChange={handleCheckboxChange} 
              />
              5) 가족이 도와주지 않아서
            </label>
            <label>
              <input 
                type="checkbox" 
                name="question12_1" 
                value="경제적으로 부담이 되서" 
                onChange={handleCheckboxChange} 
              />
              6) 경제적으로 부담이 되서
            </label>
            <div className="other-option">
              <div>
                <label style={{ display: 'block', marginBottom: '8px' }}>
                  7) 기타:
                </label>
                <textarea 
                  name="question12_1_other" 
                  onChange={(e) => {
                      const value = e.target.value;
                      // Remove any previous "기타" entries
                      const filteredAnswers = answers.question12_1.filter(item => !item.startsWith("기타: "));
                      
                      // Only add the new value if it's not empty
                      if (value.trim()) {
                        setAnswers({
                            ...answers,
                            question12_1: [...filteredAnswers, `기타: ${value}`]
                        });
                      } else {
                        setAnswers({
                            ...answers,
                            question12_1: filteredAnswers
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
          <p className="question">13. 암 진단 및 치료 이후, 식이조절을 한다.</p>
          <div className="radio-group">
            <label>
              <input 
                type="radio" 
                name="question12" 
                value="5" 
                onChange={handleChange} 
                required 
              />
              매우 그렇다
            </label>
            <label>
              <input 
                type="radio" 
                name="question12" 
                value="4" 
                onChange={handleChange} 
              />
              약간 그렇다
            </label>
            <label>
              <input 
                type="radio" 
                name="question12" 
                value="3" 
                onChange={handleChange} 
              />
              보통이다
            </label>
            <label>
              <input 
                type="radio" 
                name="question12" 
                value="2" 
                onChange={handleChange} 
              />
              약간 그렇지 않다
            </label>
            <label>
              <input 
                type="radio" 
                name="question12" 
                value="1" 
                onChange={handleChange} 
              />
              전혀 그렇지 않다
            </label>
          </div>
        </div>

        <div className="question-item sub-question">
          <p className="question">13-1.아래 각각의 사항에 대해서 식이조절을 얼마나 잘 하는지 체크해 주세요.</p>
          <div className="checkbox-group">
            <label>
              <input 
                type="checkbox" 
                name="question13_1" 
                value="조미료 섭취를 줄인다." 
                onChange={handleCheckboxChange} 
              />
              1) 조미료 섭취를 줄인다.
            </label>
            <label>
              <input 
                type="checkbox" 
                name="question13_1" 
                value="식품의 신선도를 중요시한다." 
                onChange={handleCheckboxChange} 
              />
              2) 식품의 신선도를 중요시한다.
            </label>
            <label>
              <input 
                type="checkbox" 
                name="question13_1" 
                value="채식 및 과일 위주의 식습관을 한다." 
                onChange={handleCheckboxChange} 
              />
              3) 채식 및 과일 위주의 식습관을 한다.
            </label>
            <label>
              <input 
                type="checkbox" 
                name="question13_1" 
                value="육류 섭취를 조절한다." 
                onChange={handleCheckboxChange} 
              />
              4) 육류 섭취를 조절한다.
            </label>
            <label>
              <input 
                type="checkbox" 
                name="question13_1" 
                value="탄수화물 섭취를 조절한다." 
                onChange={handleCheckboxChange} 
              />
              5) 탄수화물 섭취를 조절한다.
            </label>
            <label>
              <input 
                type="checkbox" 
                name="question13_1" 
                value="항암식품(예: 버섯, 도라지, 두유, 현미식 등)을 먹는다." 
                onChange={handleCheckboxChange} 
              />
              6) 항암식품(예: 버섯, 도라지, 두유, 현미식 등)을 먹는다.
            </label>
          </div>
        </div>

        <div className="navigation-buttons">
          <button type="button" onClick={() => navigate('/survey/section1')} className="back-button">이전</button>
          <button type="submit" className="next-button">다음</button>
        </div>
      </form>
    </div>
  );
};

export default SurveySection2;
