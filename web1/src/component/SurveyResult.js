import React from 'react';
import { Box, Grid, Typography, Container, Paper } from '@mui/material';
import { Radar, Bar } from 'react-chartjs-2';
import {
  Chart,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Legend,
  Tooltip,
  CategoryScale,
  LinearScale,
  BarElement
} from 'chart.js';

import * as SurveyUtils from '../utils/SurveyUtils';

// 차트 요소 등록
Chart.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Legend,
  Tooltip,
  CategoryScale,
  LinearScale,
  BarElement
);

// 레이블 및 매핑
const labelMap = {
  physicalChange: '암 이후 내 몸의 변화',
  healthManagement: '건강한 삶을 위한 관리',
  support: '회복을 도와주는 사람들',
  psychologicalBurden: '심리적 부담',
  socialBurden: '사회적 삶의 부담',
  resilience: '암 이후 탄력성',
  lifestyle: '생활 습관'
};
const maxScores = {
  physicalChange: 40,
  healthManagement: 25,
  support: 20,
  psychologicalBurden: 40,
  socialBurden: 15,
  resilience: 25,
  lifestyle: 10
};

const SurveyResult = ({
  rawScores = {},
  meanScores = {},
  stdScores = {},
  riskGroups = {},
  overallFeedback = "",
  overallRiskGroup = "",
  answers = {},
  riskByMean = {} // ← 추가
}) => {
  // 차트 옵션에 반응형 객체 대신 JS 분기 사용
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 600 : false;
  const legendBoxWidth = isMobile ? 8 : 10;
  const legendFontSize = isMobile ? 9 : 10;
  const legendPadding = isMobile ? 8 : 10;

  // 1) 데이터 전처리
  const processed = Object.keys(rawScores).map((key) => {
    const value = rawScores[key] ?? 0;
    const mean  = meanScores[key] ?? 0;
    const included = key !== 'lifestyle';
    const sectionName = labelMap[key];
    return {
      key,
      label: sectionName,
      value,
      mean,
      max: maxScores[key],
      stdScore: included ? SurveyUtils.newScore(sectionName, mean) : 0,
      level: included ? SurveyUtils.getRiskGroup(sectionName, mean) : '저위험집단',
      included
    };
  });

  // 디버깅: mean, stdScore 값 콘솔 출력
  console.table(processed.map(({ key, mean, stdScore }) => ({ key, mean, stdScore })));

  // 2) 레이더 차트 데이터
  const radarData = {
    labels: processed.filter(p => p.included).map(p => p.label),
    datasets: [{
      label: '표준화 점수',
      data: processed.filter(p => p.included).map(p => p.stdScore),
      backgroundColor: 'rgba(25, 118, 210, 0.2)',
      borderColor: 'rgba(25, 118, 210, 1)',
      borderWidth: 2,
      pointBackgroundColor: 'rgba(25, 118, 210, 1)'
    }]
  };

  // 3) 막대 차트 데이터
  const cats = processed.filter(p => p.included);
  const labels = cats.map(p => p.label);
  // ① 파란 막대: **T-score**(0~100)
  const myScores = cats.map(p => p.stdScore ?? 0);
  // ② 회색 막대: **기준선 50**(T-score 평균)
  const avgScores = cats.map(() => 50);
  const barData = {
    labels,
    datasets: [
      {
        label: '나의 T-점수',
        data: myScores,
        backgroundColor: 'rgba(54,162,235,0.6)'
      },
      {
        label: '집단 평균(T=50)',
        data: avgScores,
        backgroundColor: 'rgba(200,200,200,0.5)'
      }
    ]
  };
  const barOptions = {
    responsive: true,
    plugins: { legend: { position: 'top' } },
    scales: {
      y: { beginAtZero: true, max: 100, ticks: { stepSize: 10 } }
    }
  };

  // 4) 추가 피드백: answers 전체를 통째로 함수에 전달
  const additionalComments = SurveyUtils.getAdditionalFeedback(
    answers,
    meanScores,
    riskByMean
  );

  return (
    <Box sx={{ backgroundColor: 'background.default', py: { xs: 2, sm: 4, md: 6 } }}> {/* py 반응형으로 수정 */}
      <Container maxWidth="lg"> {/* maxWidth는 유지하되, 내부 요소들이 반응하도록 */}

        {/* 전체를 감싸는 하얀 배경 */}
        <Paper elevation={3} sx={{ p: { xs: 2, sm: 3, md: 4 }, borderRadius: 3 }}> {/* p 반응형으로 수정 */}

          {/* 타이틀 & 설명 */}
          <Typography variant="h5" align="center" sx={{ fontWeight: 'bold', mb: 1, color: 'primary.main', fontSize: { xs: '1.5rem', sm: '2rem' } }}> {/* fontSize 반응형 */}
            건강 관리 결과
          </Typography>
          <Typography variant="body2" align="center" sx={{ mb: { xs: 2, sm: 3, md: 4 }, fontSize: { xs: '0.8rem', sm: '1rem'} }} color="text.secondary"> {/* mb, fontSize 반응형 */}
            현재 상태를 시각적으로 확인하고, 집중 관리가 필요한 영역과 추천 사항을 확인하세요.
          </Typography>

          {/* 1. 영역별 점수 비교 */}
          <Paper elevation={2} sx={{ p: { xs: 2, sm: 3, md: 5 }, mb: 4 }}> {/* p 반응형 */}
            <Typography variant="h6" align="center" sx={{ fontWeight: 'bold', mb: 3, color: 'primary.dark', fontSize: { xs: '1.2rem', sm: '1.5rem' } }}> {/* fontSize 반응형 */}
              영역별 점수 비교
            </Typography>
            <Box sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              mx:'auto',
              height: { xs: 280, sm: 350, md: 400 }, // 모바일 높이 약간 줄임
              maxWidth: { xs: '100%', sm: 550, md: 700 }, // 모바일 최대 너비 조정
            }}>
              <Radar data={radarData} options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: { r: { suggestedMin: 0, suggestedMax: 100, ticks: { backdropPadding: { x: 10, y: 5 } } } }, // 레이더 차트 눈금 패딩 추가
                plugins: {
                  legend: {
                    labels: {
                      boxWidth: legendBoxWidth,
                      font: { size: legendFontSize },
                      padding: legendPadding
                    }
                  }
                }
              }} />
            </Box>
          </Paper>

          {/* 2. 카테고리별 점수 */}
          <Paper elevation={2} sx={{ p: { xs: 2, sm: 3, md: 5 }, mb: 4 }}> {/* p 반응형 */}
            <Typography variant="h6" align="center" sx={{ fontWeight: 'bold', mb: 3 , color: 'primary.dark', fontSize: { xs: '1.2rem', sm: '1.5rem' } }}> {/* fontSize 반응형 */}
              카테고리별 점수
            </Typography>
            <Box sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: { xs: 300, sm: 400, md: 500 }, // 모바일 높이 약간 줄임
              maxWidth: { xs: '100%', sm: 550, md: 700 }, // 모바일 최대 너비 조정
              mx:'auto'
            }}>
              <Bar data={barData} options={{...barOptions, // 기존 옵션 유지
                responsive: true, // 추가
                maintainAspectRatio: false, // 추가
                plugins: { // 모바일에서 범례가 너무 클 경우 조정
                  legend: {
                    position: 'top',
                    labels: {
                      boxWidth: legendBoxWidth,
                      font: { size: legendFontSize },
                      padding: legendPadding
                    }
                  }
                },
                scales: { // 모바일에서 y축 간격 조정
                  y: { beginAtZero: true, max: 100, ticks: { stepSize: 20, font: { size: legendFontSize } } }, // y축 폰트 반응형
                  x: { ticks: { font: { size: legendFontSize } } } // x축 폰트 반응형
                }
              }} />
            </Box>
          </Paper>

          {/* 3. 피드백 카드 그리드 */}
          <Grid container spacing={2} direction="column">
            {/* 전체 피드백 카드 */}
            <Grid item xs={12} >
              <Paper elevation={1} sx={{
                p: { xs: 2, sm: 3 }, // p 반응형
                borderLeft: `4px solid #ffffff`, // 이 부분은 디자인에 따라 유지하거나 수정
                height: '100%'
              }}>
                <Typography variant="subtitle1" align="center" sx={{ fontWeight: 'bold', mb: 1, color: 'primary.dark', fontSize: { xs: '1rem', sm: '1.25rem' } }}> {/* fontSize 반응형 */}
                  전체 피드백
                </Typography>
                <Typography variant="subtitle2" align="center" sx={{ mb: .5, fontSize: { xs: '0.9rem', sm: '1rem' } }}> {/* fontSize 반응형 */}
                  {overallRiskGroup}
                </Typography>
                <Typography variant="body2" align="center" color="text.secondary" sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}> {/* fontSize 반응형 */}
                  {overallFeedback}
                </Typography>
              </Paper>
            </Grid>

            {/* ★ 추가 피드백 – 하나의 영역으로 통합 */}
            {additionalComments.length > 0 && (
              <Grid item xs={12}>
                <Paper elevation={1} sx={{ p: { xs: 2, sm: 3 }, borderLeft:'4px solid #ffffff' }}> {/* p 반응형 */}
                  <Typography
                    variant="subtitle1"
                    align="center"
                    sx={{ fontWeight:'bold', mb:1, color:'primary.dark', fontSize: { xs: '1rem', sm: '1.25rem' } }} /* fontSize 반응형 */
                  >
                    추가 피드백
                  </Typography>
                  {additionalComments.map(({ text, style }, idx) => (
                    <Typography
                      key={idx}
                      variant="body2"
                      align="center"
                      sx={{ mb: .5,
                        color:
                          style === "error"   ? "error.main"   :
                          style === "info"    ? "primary.main" :
                          style === "success" ? "success.main" : "text.primary",
                        fontWeight:'bold',
                        fontSize: { xs: '0.8rem', sm: '0.9rem' } /* fontSize 반응형 */
                      }}
                    >
                      {text}
                    </Typography>
                  ))}
                </Paper>
              </Grid>
            )}
          </Grid>

        </Paper>
      </Container>
    </Box>
  );
};

export default SurveyResult;
