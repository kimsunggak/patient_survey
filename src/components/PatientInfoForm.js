import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PatientInfoForm.css';

const PatientInfoForm = () => {
  const navigate = useNavigate();
  const [patientInfo, setPatientInfo] = useState({
    name: '',
    age: '',
    gender: '',
    patientId: '',
    department: '',
    dischargeDate: '',
    phoneNumber: '',
    email: '',
  });
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientInfo({
      ...patientInfo,
      [name]: value,
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!patientInfo.name) errors.name = '이름을 입력해주세요';
    if (!patientInfo.age) errors.age = '나이를 입력해주세요';
    if (!patientInfo.gender) errors.gender = '성별을 선택해주세요';
    if (!patientInfo.patientId) errors.patientId = '환자 ID를 입력해주세요';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // 환자 정보 로컬 스토리지에 저장
      localStorage.setItem('patientInfo', JSON.stringify(patientInfo));
      
      // 설문조사 첫 페이지로 이동
      navigate('/survey/section1');
    }
  };

  return (
    <div className="patient-form-container">
      <div className="form-header">
        <h1>퇴원 준비 설문조사</h1>
        <p>사회 적응을 위한 평가를 위해 아래 정보를 입력해주세요.</p>
      </div>

      <form onSubmit={handleSubmit} className="patient-form">
        <div className="form-group">
          <label htmlFor="name">이름 *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={patientInfo.name}
            onChange={handleChange}
            className={formErrors.name ? 'error' : ''}
          />
          {formErrors.name && <span className="error-message">{formErrors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="age">나이 *</label>
          <input
            type="number"
            id="age"
            name="age"
            value={patientInfo.age}
            onChange={handleChange}
            className={formErrors.age ? 'error' : ''}
          />
          {formErrors.age && <span className="error-message">{formErrors.age}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="gender">성별 *</label>
          <select
            id="gender"
            name="gender"
            value={patientInfo.gender}
            onChange={handleChange}
            className={formErrors.gender ? 'error' : ''}
          >
            <option value="">선택하세요</option>
            <option value="male">남성</option>
            <option value="female">여성</option>
            <option value="other">기타</option>
          </select>
          {formErrors.gender && <span className="error-message">{formErrors.gender}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="patientId">환자 ID *</label>
          <input
            type="text"
            id="patientId"
            name="patientId"
            value={patientInfo.patientId}
            onChange={handleChange}
            className={formErrors.patientId ? 'error' : ''}
          />
          {formErrors.patientId && <span className="error-message">{formErrors.patientId}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="department">진료과</label>
          <input
            type="text"
            id="department"
            name="department"
            value={patientInfo.department}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="dischargeDate">퇴원 예정일</label>
          <input
            type="date"
            id="dischargeDate"
            name="dischargeDate"
            value={patientInfo.dischargeDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber">연락처</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={patientInfo.phoneNumber}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            name="email"
            value={patientInfo.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-footer">
          <button type="submit" className="submit-button">다음</button>
        </div>
      </form>
    </div>
  );
};

export default PatientInfoForm;
