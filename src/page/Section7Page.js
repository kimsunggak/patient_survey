// src/pages/Section7Page.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  Alert, AlertTitle,
  LinearProgress
} from '@mui/material';
import Section7Component from '../component/Section7Component';
import { saveUserAnswers } from '../utils/firebaseUtils'; // 추가

const steps = [
  '암 이후 내 몸의 변화',
  '건강한 삶을 위한 관리',
  '회복하도록 도와주는 사람들',
  '심리적 부담',
  '사회적 삶의 부담',
  '암 이후 탄력성',
  '추가'
];

const Section7Page = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [answers, setAnswers] = useState(location.state?.answers || {});
  const userName = location.state?.userName; // userName 가져오기
  const [error, setError] = useState(false);

  const total = 2;  // Q32~Q33
  const done = ['q32', 'q33'].filter((id) => answers[id]).length;
  const progress = (done / total) * 100;
  const currentStep = 6;

  const handleNext = async () => { // async 추가
    if (done < total) return setError(true);
    if (!userName) {
      alert("사용자 정보가 없습니다. 처음부터 다시 시도해주세요.");
      navigate('/'); // 홈으로 이동 또는 다른 적절한 처리
      return;
    }
    try {
      await saveUserAnswers(userName, answers); // 설문 답변 저장
      console.log("설문 답변 저장 완료 for:", userName);
      navigate('/survey-result', { state: { userName, answers } }); // 결과 페이지로 userName과 answers 전달
    } catch (e) {
      console.error("설문 답변 저장 실패:", e);
      alert("답변 저장에 실패했습니다. 다시 시도해주세요.");
    }
  };

  useEffect(() => {
    if (done === total) setError(false);
  }, [done]);

  return (
    <Container maxWidth="md" sx={{ py: 4, background: 'none',
      bgcolor: 'background.default' }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
        암 생존자 건강관리 설문
      </Typography>
      <Typography variant="subtitle1" align="center" color="textSecondary" gutterBottom>
        여러분의 건강 상태와 일상생활에 대한 것입니다. 아래 내용을 체크해 주세요.
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        {steps.map((label, idx) => {
          const bg = idx < currentStep
            ? 'success.main'
            : idx === currentStep
            ? 'primary.main'
            : 'grey.300';
          const color = idx <= currentStep ? 'text.primary' : 'text.disabled';
          return (
            <Box key={label} sx={{ flex: 1, textAlign: 'center' }}>
              <Box
                sx={{
                  width: 32, height: 32, mx: 'auto',
                  borderRadius: '50%', bgcolor: bg, color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}
              >
                {idx + 1}
              </Box>
              <Typography variant="caption" sx={{ mt: 1, color }}>
                {label}
              </Typography>
            </Box>
          );
        })}
      </Box>

      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, textAlign: "center" }}>
          {steps[currentStep]}
        </Typography>

        <Box sx={{ mb: 3 }}>
          <LinearProgress variant="determinate" value={progress} />
          <Typography variant="body2" align="right" sx={{ mt: 1, color: 'text.secondary' }}>
            진행 상황: {done}/{total}
          </Typography>
        </Box>

        <Section7Component answers={answers} setAnswers={setAnswers} />

        {error && (
          <Alert severity="warning" sx={{ mt: 2 }}>
            <AlertTitle>경고</AlertTitle>
            모든 문항을 응답해야 다음으로 넘어갈 수 있습니다.
          </Alert>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button variant="outlined" onClick={() => navigate('/section6')}>
            이전
          </Button>
          <Button variant="contained" onClick={handleNext}>
            완료
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Section7Page;
