// utils/scoreUtils.js
export const rawDataStats = {
    physicalChange: { mean: 3.09, sd: 0.95 },
    healthManagement: { mean: 3.63, sd: 0.76 },
    support: { mean: 3.84, sd: 0.94 },
    psychologicalBurden: { mean: 3.08, sd: 0.91 },
    socialBurden: { mean: 3.39, sd: 1.2 },
    resilience: { mean: 4.28, sd: 0.72 }
  };
  
  export const getStandardScore = (value, mean, sd) => {
    const z = (value - mean) / sd;
    return Math.round((z * 16.67) + 50); // 평균 50, 표준편차 10 기준
  };
  
  export const getRiskLevel = (value, mean, sd) => {
    const cutoff1 = mean - sd;
    const cutoff2 = mean;
    if (value <= cutoff1) return 'high';
    if (value <= cutoff2) return 'warning';
    return 'safe';
  };
  