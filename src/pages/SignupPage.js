// src/pages/SignupPage.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';

// 스타일 컴포넌트들은 LoginPage와 유사하므로 일부 재사용
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 2rem 0;
`;

const SignupCard = styled.div`
  width: 500px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 2rem;
`;

const LogoArea = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const LogoText = styled.h1`
  font-size: 1.8rem;
  color: #2a5e8c;
  margin: 0;
`;

const Subtitle = styled.p`
  color: #6c757d;
  margin: 0.5rem 0 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #495057;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  transition: border-color 0.15s ease-in-out;
  
  &:focus {
    border-color: #2a5e8c;
    outline: none;
  }
`;

const Button = styled.button`
  background-color: #2a5e8c;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out;
  
  &:hover {
    background-color: #1d4269;
  }
  
  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: #dc3545;
  margin-top: 1rem;
  text-align: center;
`;

const SuccessMessage = styled.p`
  color: #28a745;
  margin-top: 1rem;
  text-align: center;
`;

const StyledLink = styled(Link)`
  color: #2a5e8c;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const LinkContainer = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.9rem;
`;

// 2열 그리드 레이아웃
const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

// 정보 상자
const InfoBox = styled.div`
  background-color: #e9f5ff;
  border-radius: 4px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  
  p {
    margin: 0 0 0.5rem;
    color: #2a5e8c;
  }
  
  p:last-child {
    margin-bottom: 0;
  }
`;

function SignupPage() {
  const { signup, currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    organization: ''
  });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  
  // 이미 로그인되어 있으면 대시보드로 리디렉션
  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const validateForm = () => {
    // 모든 필드가 입력되었는지 확인
    for (const key in formData) {
      if (!formData[key]) {
        setError('모든 필드를 입력해주세요.');
        return false;
      }
    }
    
    // 비밀번호 일치 확인
    if (formData.password !== formData.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return false;
    }
    
    // 비밀번호 길이 확인
    if (formData.password.length < 6) {
      setError('비밀번호는 최소 6자 이상이어야 합니다.');
      return false;
    }
    
    // 이메일 형식 확인
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('유효한 이메일 주소를 입력해주세요.');
      return false;
    }
    
    // 전화번호 형식 확인
    const phoneRegex = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/;
    if (!phoneRegex.test(formData.phone)) {
      setError('유효한 전화번호 형식을 입력해주세요. (예: 010-1234-5678)');
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      setError('');
      setLoading(true);
      
      await signup(
        formData.email,
        formData.password,
        formData.name,
        formData.phone,
        formData.organization
      );
      
      setSuccess('회원가입이 완료되었습니다. 바로 서비스를 이용하실 수 있습니다.');
      
      // 3초 후 대시보드로 이동
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      console.error("회원가입 오류:", error);
      
      if (error.code === 'auth/email-already-in-use') {
        setError('이미 사용 중인 이메일입니다.');
      } else if (error.code === 'auth/invalid-email') {
        setError('유효하지 않은 이메일 형식입니다.');
      } else if (error.code === 'auth/weak-password') {
        setError('비밀번호가 너무 약합니다. 더 강력한 비밀번호를 사용해주세요.');
      } else {
        setError('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Container>
      <SignupCard>
        <LogoArea>
          <LogoText>암 생존자 케어</LogoText>
          <Subtitle>사회복지사 회원가입</Subtitle>
        </LogoArea>
        
        <InfoBox>
          <p>회원가입 후 바로 서비스를 이용하실 수 있습니다.</p>
          <p>회원가입 시 입력한 정보는 암 생존자 케어 서비스 제공에만 활용됩니다.</p>
        </InfoBox>
        
        <Form onSubmit={handleSubmit}>
          <FormRow>
            <FormGroup>
              <Label htmlFor="name">이름</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="이름을 입력하세요"
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="phone">연락처 (예: 010-1234-5678)</Label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="연락처를 입력하세요"
              />
            </FormGroup>
          </FormRow>
          
          <FormGroup>
            <Label htmlFor="email">이메일</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="이메일 주소를 입력하세요"
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="organization">소속 기관</Label>
            <Input
              type="text"
              id="organization"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              placeholder="소속 기관명을 입력하세요"
            />
          </FormGroup>
          
          <FormRow>
            <FormGroup>
              <Label htmlFor="password">비밀번호</Label>
              <Input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="비밀번호를 입력하세요"
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="confirmPassword">비밀번호 확인</Label>
              <Input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="비밀번호를 다시 입력하세요"
              />
            </FormGroup>
          </FormRow>
          
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>{success}</SuccessMessage>}
          
          <Button type="submit" disabled={loading}>
            {loading ? '회원가입 중...' : '회원가입'}
          </Button>
          
          <LinkContainer>
            이미 계정이 있으신가요? <StyledLink to="/login">로그인하기</StyledLink>
          </LinkContainer>
        </Form>
      </SignupCard>
    </Container>
  );
}

export default SignupPage;