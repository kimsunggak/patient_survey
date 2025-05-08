// src/pages/SurveyResultPage.jsx
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import SurveyResult from '../component/SurveyResult';

const SurveyResultPage = () => {
  // 실제로는 API에서 받아오시겠지만 예시 더미 데이터
  const dummyScores = {
    physicalChange: 19,
    healthManagement: 15,
    support: 11,
    psychologicalBurden: 20,
    socialBurden: 8,
    resilience: 11,
    lifestyle: 5
  };

  const dummyRecs = {
    warning: '건강한 삶을 위한 관리 점수가 낮습니다. 이 부분에 대한 개선이 도움이 될 수 있습니다.',
    info: '균형 잡힌 식단과 규칙적인 운동을 통해 건강 관리를 개선해보세요. 암 생존자를 위한 영양 프로그램에 참여하는 것도 좋은 방법입니다.'
  };

  return (
    <Box p={4}>
    

      <SurveyResult scores={dummyScores} recommendations={dummyRecs} />

      <Box mt={4} display="flex" justifyContent="center">
  <Button
    variant="contained"
    href="/"
    sx={{
      px: 6,            // 좌우 패딩 (버튼 너비 확장)
      py: 2,            // 상하 패딩 (버튼 높이 확장)
      fontSize: '1.1rem', // 글자 크기 키움
      fontWeight: 'bold', // 글자 굵게
      borderRadius: 1     // 각진 모서리
    }}
  >
    홈으로 가기
  </Button>
</Box>

    </Box>
  );
};

export default SurveyResultPage;
