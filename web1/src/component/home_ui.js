// src/component/home_ui.js
import React from 'react';
import { Box, Typography, Button, Grid, Paper } from '@mui/material';
import AssessmentIcon from '@mui/icons-material/Assessment';
import InsightsIcon from '@mui/icons-material/Insights';
import PeopleIcon from '@mui/icons-material/People';

export const HeaderSection = () => (
  <Box textAlign="center" py={{ xs: 3, sm: 4, md: 5 }}> {/* 반응형 py */}
    <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom sx={{ fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' } }}> {/* 반응형 fontSize */}
      암 생존자 건강관리
    </Typography>
    <Typography variant="subtitle1" color="textSecondary" sx={{ fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' } }}> {/* 반응형 fontSize */}
      다시 삶의 중심으로 돌아오는 여정을 함께합니다
    </Typography>
  </Box>
);

export const InfoCard = ({ icon, title, description }) => (
  <Paper elevation={3} sx={{
    p: { xs: 2, sm: 3 }, // 반응형 p
    textAlign: 'center',
    height: { xs: 'auto', md: '100%' }, // 모바일에서는 auto, 데스크탑에서는 100%로 카드 높이 통일
    borderRadius: 3,
    minHeight: { xs: 180, sm: 200 }, // 반응형 minHeight 유지
    display: 'flex', // Flexbox 추가
    flexDirection: 'column', // 세로 정렬
    justifyContent: 'center' // 가운데 정렬
  }} >
    <Box fontSize={{ xs: '2.5rem', sm: '3rem' }} mb={{ xs: 1, sm: 2 }} color="primary.main"> {/* 반응형 fontSize, mb */}
      {icon}
    </Box>
    <Typography variant="h6" fontWeight="600" color="primary" sx={{ fontSize: { xs: '1rem', sm: '1.125rem' } }}> {/* 반응형 fontSize */}
      {title}
    </Typography>
    <Typography variant="body2" color="textSecondary" mt={1} sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}> {/* 반응형 fontSize */}
      {description}
    </Typography>
  </Paper>
);

export const CardContainer = () => (
  <Grid container spacing={{ xs: 2, sm: 3 }} mt={3} // 반응형 spacing
    sx={{ 
      pb: 2, 
      flexWrap: { xs: 'wrap', md: 'nowrap' }, // md 이상에서만 nowrap
      overflowX: { md: 'auto' } // md 이상에서만 가로 스크롤
    }}
  >
    <Grid item xs={12} md={4} sx={{ display: 'flex' }}> {/* display: flex 추가 */}
      <InfoCard
        icon={<AssessmentIcon fontSize="inherit" />}
        title="맞춤형 평가"
        description="신체적, 심리적, 사회적 상태를 종합적으로 평가합니다."
      />
    </Grid>
    <Grid item xs={12} md={4} sx={{ display: 'flex' }}> {/* display: flex 추가 */}
      <InfoCard
        icon={<InsightsIcon fontSize="inherit" />}
        title="시각화된 결과"
        description="한눈에 확인할 수 있는 시각화된 건강 정보를 제공합니다."
      />
    </Grid>
    <Grid item xs={12} md={4} sx={{ display: 'flex' }}> {/* display: flex 추가 */}
      <InfoCard
        icon={<PeopleIcon fontSize="inherit" />}
        title="전문가 상담"
        description="필요시 1:1 사회복지사 상담을 연결해 드립니다."
      />
    </Grid>
  </Grid>
);

export const StartButton = ({ onClick }) => (
  <Box textAlign="center" mt={{ xs: 3, sm: 4, md: 5 }}> {/* 반응형 mt */}
    <Button
      onClick={onClick}
      variant="contained"
      size="large"
      sx={{
        px: { xs: 3, sm: 4, md: 5 }, // 반응형 px
        py: { xs: 1, sm: 1.25, md: 1.5 }, // 반응형 py
        borderRadius: 2,
        backgroundColor: '#4A90E2',
        '&:hover': {
          backgroundColor: '#3b7cd2',
        },
        fontSize: { xs: '0.9rem', sm: '1rem' } // 반응형 fontSize
      }}
    >
      설문 시작하기
    </Button>
  </Box>
);

export const FooterCopyright = () => (
  <Box textAlign="center" mt={{ xs: 4, sm: 5, md: 6 }} py={{ xs: 1.5, sm: 2 }}> {/* 반응형 mt, py */}
    <Typography variant="caption" color="textSecondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}> {/* 반응형 fontSize */}
      © 2025 암 생존자 건강관리 서비스 | 모든 저작권은 해당기관에 보호됩니다.
    </Typography>
  </Box>
);
