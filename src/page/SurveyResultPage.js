// src/pages/SurveyResultPage.jsx
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useLocation } from 'react-router-dom';
import SurveyResult from '../component/SurveyResult';
import * as SurveyUtils from '../utils/SurveyUtils';

const labelMap = {
  physicalChange: '암 이후 내 몸의 변화',
  healthManagement: '건강한 삶을 위한 관리',
  support: '회복을 도와주는 사람들',
  psychologicalBurden: '심리적 부담',
  socialBurden: '사회적 삶의 부담',
  resilience: '암 이후 탄력성'
};

const sectionIds = {
  physicalChange: ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8'],
  healthManagement: ['q9', 'q10', 'q11', 'q12', 'q13'],
  support: ['q14', 'q15', 'q16', 'q17'],
  psychologicalBurden: ['q18', 'q19', 'q20', 'q21', 'q22', 'q23', 'q24', 'q25'],
  socialBurden: ['q26', 'q27', 'q28'],
  resilience: ['q29', 'q30', 'q31']
};

const SurveyResultPage = () => {
  const location = useLocation();
  const answers = location.state?.answers || {};
  console.log('answers:', JSON.stringify(answers, null, 2));

  // 1. 역코딩 적용
  const reversed = SurveyUtils.applyReverseScore(answers);
  console.log('reversed:', JSON.stringify(reversed, null, 2));

  // 2. 영역별 합계(원점수)
  const rawScores = {};
  Object.entries(sectionIds).forEach(([key, ids]) => {
    rawScores[key] = ids.reduce((sum, id) => sum + (Number(reversed[id]) || 0), 0);
  });
  console.log('rawScores:', JSON.stringify(rawScores, null, 2));

  // 3. **합계 → 평균** 산출
  const meanScores = {};
  Object.entries(sectionIds).forEach(([key, ids]) => {
    meanScores[key] = rawScores[key] / ids.length;
  });
  console.log('meanScores:', JSON.stringify(meanScores, null, 2));

  // ★ 섹션별 원점수 평균으로 집단 분류 (한 번만 계산)
  const riskGroups = {};
  Object.entries(meanScores).forEach(([key, mean]) => {
    riskGroups[key] = SurveyUtils.getRiskGroup(labelMap[key], mean);
  });
  console.log('riskGroups:', JSON.stringify(riskGroups, null, 2));
  // 필요하다면 riskByMean 별칭으로 재활용
  const riskByMean = riskGroups;

  // 4. z-score(T-score) 변환
  const stdScores = {};
  Object.entries(meanScores).forEach(([key, mean]) => {
    const sectionName = labelMap[key];
    stdScores[key] = SurveyUtils.newScore(sectionName, mean);
  });
  console.log('stdScores:', JSON.stringify(stdScores, null, 2));

  // 6. 전체 평균 **Mean-점수** → 집단 분류 → 템플릿 문구
  const overallMean =
    Object.values(meanScores).reduce((a, b) => a + b, 0) /
    Object.values(meanScores).length;
  console.log('overallMean:', JSON.stringify(overallMean, null, 2));
  const overallRiskGroup =
    SurveyUtils.getRiskGroup('전체 평균 (암 생존자 건강관리)', overallMean);
  console.log('overallRiskGroup:', JSON.stringify(overallRiskGroup, null, 2));
  const overallFeedback =
    SurveyUtils.getPatientComment(overallRiskGroup);
  console.log('overallFeedback:', JSON.stringify(overallFeedback, null, 2));

  // 7. SurveyResult에 전달
  return (
    <Box p={4}>
      <SurveyResult
        rawScores={rawScores}
        meanScores={meanScores}
        stdScores={stdScores}
        riskGroups={riskGroups}
        overallFeedback={overallFeedback}
        overallRiskGroup={overallRiskGroup}
        answers={answers} // 원본 answers도 전달하여 SurveyResult 내에서도 필요시 확인 가능
        riskByMean={riskByMean}
      />
      <Box mt={4} display="flex" justifyContent="center">
        <Button
          variant="contained"
          href="/"
          sx={{ px: 6, py: 2, fontSize: '1.1rem', fontWeight: 'bold', borderRadius: 1 }}
        >
          홈으로 가기
        </Button>
      </Box>
    </Box>
  );
};

export default SurveyResultPage;
