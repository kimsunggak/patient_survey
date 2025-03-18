import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signupform.css";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    confirmPassword: "",
    name: "",
    contact: "",
    email: "",
    emailDomain: "",
  });

  const [useCustomEmail, setUseCustomEmail] = useState(false);
  const navigate = useNavigate();

  const emailOptions = ["gmail.com", "naver.com", "daum.net", "yahoo.com"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleEmailInput = () => {
    setUseCustomEmail(!useCustomEmail);
    setFormData({ ...formData, emailDomain: "" });
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // ✅ 회원가입 성공 메시지 띄우기
    alert("🎉 회원가입이 완료됐습니다! 로그인 페이지로 이동합니다.");

    // ✅ 로그인 페이지로 이동
      navigate("/");
    };

  return (
    <div className="signup-container">
      <h2 className="signup-title">회원가입</h2>
      <form onSubmit={handleSignUp} className="signup-form">
        <label>아이디*</label>
        <div className="input-group">
          <input type="text" name="id" value={formData.id} onChange={handleChange} required />
          <button type="button" className="check-button">중복확인</button>
        </div>

        <label>비밀번호*</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />

        <label>비밀번호 재확인*</label>
        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />

        <label>이름*</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>연락처*</label>
        <input type="text" name="contact" value={formData.contact} onChange={handleChange} required />

        <label>이메일</label>
        <div className="input-group">
          <input type="text" name="email" value={formData.email} onChange={handleChange} />
          {useCustomEmail ? (
            <input type="text" name="emailDomain" placeholder="직접 입력" value={formData.emailDomain} onChange={handleChange} />
          ) : (
            <select name="emailDomain" value={formData.emailDomain} onChange={handleChange}>
              <option value="">선택</option>
              {emailOptions.map((domain) => (
                <option key={domain} value={domain}>{domain}</option>
              ))}
            </select>
          )}
          <button type="button" onClick={toggleEmailInput}>직접입력</button>
        </div>

        <button type="submit,button" className="signup-button" onClick={() => navigate("/signup")}>회원가입</button>
      </form>
    </div>
  );
};

export default SignUpForm;
