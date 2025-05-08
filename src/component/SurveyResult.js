import React from 'react';
import { Box, Grid, Typography, Container, Paper, Divider } from '@mui/material';
import { red, orange } from '@mui/material/colors';
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
import { green, amber } from '@mui/material/colors';

import { rawDataStats, getStandardScore, getRiskLevel } from '../utils/scoreutils';

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
  support: '회복하도록 도와주는 사람들',
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

const SurveyResult = ({ scores }) => {
  // 1) 데이터 전처리
  const processed = Object.keys(scores).map((key) => {
    const value = scores[key] ?? 0;
    const stats = rawDataStats[key];
    const included = key !== 'lifestyle';
    return {
      key,
      label: labelMap[key],
      value,
      max: maxScores[key],
      stdScore: included ? getStandardScore(value, stats.mean, stats.sd) : 0,
      level: included ? getRiskLevel(value, stats.mean, stats.sd) : 'safe',
      stats,
      included
    };
  });

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
  const barData = {
    labels: cats.map(p => p.label),
    datasets: [
      {
        label: '제트 스코어',
        data: cats.map(p => p.stdScore),
        backgroundColor: 'rgba(25, 118, 210, 0.7)'
      },
      {
        label: '평균 점수(%)',
        data: cats.map(p => Math.round((p.stats.mean / p.max) * 100)),
        backgroundColor: 'rgba(200, 200, 200, 0.5)'
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

  // 4) 피드백 로직 분리
  const total = cats.reduce((sum, p) => sum + p.value, 0);
  const totalMax = cats.reduce((sum, p) => sum + p.max, 0);
  const totalPct = Math.round((total / totalMax) * 100);
  const lifeScore = scores.lifestyle ?? 0;

  let overallFeedback;
  if (totalPct >= 80) overallFeedback = '전반적으로 건강 관리 점수가 우수합니다!';
  else if (totalPct >= 50) overallFeedback = '건강 관리 점수가 보통 수준입니다. 지속적 관리가 필요합니다.';
  else overallFeedback = '건강 관리 점수가 낮습니다. 집중적인 관리가 필요합니다.';

  let additionalFeedback;
  if (lifeScore < maxScores.lifestyle * 0.5)
    additionalFeedback = '생활 습관 개선이 필요합니다.';
  else
    additionalFeedback = '생활 습관이 양호합니다.';

  return (
    <Box sx={{ backgroundColor: 'background.default', py: 6 }}>
      <Container maxWidth="lg">

        {/* 전체를 감싸는 하얀 배경 */}
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>

          {/* 타이틀 & 설명 */}
          <Typography variant="h5" align="center" sx={{ fontWeight: 'bold', mb: 1, color: 'primary.main' }}>
            건강 관리 결과
          </Typography>
          <Typography variant="body2" align="center" sx={{ mb: 4 }} color="text.secondary">
            현재 상태를 시각적으로 확인하고, 집중 관리가 필요한 영역과 추천 사항을 확인하세요.
          </Typography>

          {/* 1. 영역별 점수 비교 */}
          <Paper elevation={2} sx={{ p: 5, mb: 4 }}>
            <Typography variant="h6" align="center" sx={{ fontWeight: 'bold', mb: 3, color: 'primary.dark' }}>
              영역별 점수 비교
            </Typography>
            <Box sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              mx:'auto',
              height: 400,
              maxWidth: 800,
            }}>
              <Radar data={radarData} options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: { r: { suggestedMin: 0, suggestedMax: 100 } }
              }} />
            </Box>
          </Paper>

          {/* 2. 카테고리별 점수 */}
          <Paper elevation={2} sx={{ p: 5, mb: 4 }}>
            <Typography variant="h6" align="center" sx={{ fontWeight: 'bold', mb: 3 , color: 'primary.dark'}}>
              카테고리별 점수
            </Typography>
            <Box sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: 500,
              maxWidth: 800,
              mx:'auto'
            }}>
              <Bar data={barData} options={barOptions} />
            </Box>
          </Paper>

          {/* 3. 피드백 카드 그리드 */}
          <Grid container spacing={2} direction="column">
            {/* 전체 피드백 (연두색 영역) */}
            <Grid item xs={12} >
              <Paper elevation={1} sx={{
                p: 3,
                borderLeft: `4px solid #ffffff`,
                height: '100%'
              }}>
                <Typography variant="subtitle1" align="center" sx={{ fontWeight: 'bold', mb: 1, color: 'primary.dark' }}>
                  전체 피드백
                </Typography>
                <Typography variant="body2" align="center" color="text.secondary">
                  {overallFeedback}
                </Typography>
              </Paper>
            </Grid>

            {/* 추가 문항 피드백 (주황색 영역) */}
            <Grid item xs={12} >
              <Paper elevation={1} sx={{
                p: 3,
                borderLeft: `4px solid #ffffff`,
                height: '100%'
              }}>
                <Typography variant="subtitle1" align="center" sx={{ fontWeight: 'bold', mb: 1, color: 'primary.dark' }}>
                  추가 피드백
                </Typography>
                <Typography variant="body2"  align="center" color="text.secondary">
                  {additionalFeedback}
                </Typography>
              </Paper>
            </Grid>
          </Grid>

        </Paper>
      </Container>
    </Box>
  );
};

export default SurveyResult;
