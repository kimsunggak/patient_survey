// src/component/SurveyForm.js
import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Button,
  Grid,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Box,
  Paper,
  Divider
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { saveUserData } from '../utils/firebaseUtils';

const SurveyForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [diagnosisDate, setDiagnosisDate] = useState('');
  const [cancerType, setCancerType] = useState('');
  const [otherCancerType, setOtherCancerType] = useState('');
  const [treatmentTypes, setTreatmentTypes] = useState([]);
  const [otherTreatmentType, setOtherTreatmentType] = useState('');
  const [currentTreatment, setCurrentTreatment] = useState('');
  const [mentalHealthHistory, setMentalHealthHistory] = useState('');
  const [physicalLimitations, setPhysicalLimitations] = useState('');

  const handleTreatmentChange = (event) => {
    const { value } = event.target;
    setTreatmentTypes(prev =>
      prev.includes(value) ? prev.filter(t => t !== value) : [...prev, value]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      name,
      birthDate,
      age,
      gender,
      diagnosisDate,
      cancerType,
      otherCancerType,
      treatmentTypes,
      otherTreatmentType,
      currentTreatment,
      mentalHealthHistory,
      physicalLimitations,
    };
    const id = await saveUserData(userData);
    console.log('Saved user data with ID:', id);
    navigate('/section1', { state: { name } });
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={4} sx={{ p: 5, mt: 5, backgroundColor: '#fafafa', borderRadius: 2 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 700, color: '#0D47A1' }}>
          기본 스크리닝 질문
        </Typography>
        <Typography align="center" sx={{ mb: 4, color: 'gray' }}>
          아래의 항목들을 빠짐없이 입력해 주세요.
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          {/* 개인정보 섹션 */}
          <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>🧍‍♂️ 개인정보</Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2} direction="column">
            <Grid item>
              <TextField
                label="이름"
                placeholder="이름을 입력하세요"
                fullWidth
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </Grid>
            <Grid item>
              <TextField
                label="생년월일"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={birthDate}
                onChange={e => setBirthDate(e.target.value)}
              />
            </Grid>
            <Grid item>
              <TextField
                label="나이"
                placeholder="나이를 입력하세요"
                fullWidth
                type="number"
                value={age}
                onChange={e => setAge(e.target.value)}
              />
            </Grid>
            <Grid item>
              <FormControl fullWidth>
                <InputLabel>성별</InputLabel>
                <Select value={gender} onChange={e => setGender(e.target.value)} label="성별">
                  <MenuItem value="남성">남성</MenuItem>
                  <MenuItem value="여성">여성</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/* 진단 정보 섹션 */}
          <Typography variant="h6" sx={{ mt: 4, mb: 1, fontWeight: 'bold' }}>🩺 진단 정보</Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2} direction="column">
            <Grid item>
              <TextField
                label="진단 시기"
                type="date"
                fullWidth
                value={diagnosisDate}
                onChange={e => setDiagnosisDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item>
              <FormControl fullWidth>
                <InputLabel>암 종류</InputLabel>
                <Select value={cancerType} onChange={e => setCancerType(e.target.value)} label="암 종류">
                  <MenuItem value="유방암">유방암</MenuItem>
                  <MenuItem value="폐암">폐암</MenuItem>
                  <MenuItem value="대장암">대장암</MenuItem>
                  <MenuItem value="기타">기타</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {cancerType === '기타' && (
              <Grid item>
                <TextField
                  label="기타 암 종류를 입력하세요"
                  placeholder="예: 췌장암"
                  fullWidth
                  value={otherCancerType}
                  onChange={e => setOtherCancerType(e.target.value)}
                />
              </Grid>
            )}
          </Grid>

          {/* 치료 정보 섹션 */}
          <Typography variant="h6" sx={{ mt: 4, mb: 1, fontWeight: 'bold' }}>💊 치료 정보</Typography>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" fontWeight="bold" color="#003366" gutterBottom>
              받은 치료 유형 (해당하는 모든 항목 선택)
            </Typography>
            <FormGroup>
              {['수술', '항암화학요법', '방사선 치료', '호르몬 치료', '면역 치료', '표적 치료', '기타'].map(t => (
                <FormControlLabel
                  key={t}
                  control={<Checkbox checked={treatmentTypes.includes(t)} onChange={handleTreatmentChange} value={t} sx={{ transform: 'scale(1.2)' }} />}
                  label={t}
                />
              ))}
            </FormGroup>
            {treatmentTypes.includes('기타') && (
              <TextField
                fullWidth
                label="기타 치료 유형을 입력하세요"
                placeholder="예: 고강도 초음파 치료"
                value={otherTreatmentType}
                onChange={e => setOtherTreatmentType(e.target.value)}
                sx={{ mt: 2 }}
              />
            )}
          </Box>

          {/* 추가 정보 섹션 */}
          <Grid container spacing={2} direction="column" sx={{ mt: 4 }}>
            <Grid item>
              <FormControl fullWidth>
                <InputLabel>현재 치료 상태</InputLabel>
                <Select value={currentTreatment} onChange={e => setCurrentTreatment(e.target.value)}>
                  <MenuItem value="치료 전">치료 전</MenuItem>
                  <MenuItem value="치료 중">치료 중</MenuItem>
                  <MenuItem value="경과 확인 중">경과 확인 중</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl fullWidth>
                <InputLabel>정신건강 이력</InputLabel>
                <Select value={mentalHealthHistory} onChange={e => setMentalHealthHistory(e.target.value)}>
                  <MenuItem value="예">예</MenuItem>
                  <MenuItem value="아니오">아니오</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <TextField
            label="신체적 제한 사항"
            placeholder="제한 사항이 있으면 적어주세요"
            fullWidth
            multiline
            minRows={3}
            sx={{ mt: 4 }}
            value={physicalLimitations}
            onChange={e => setPhysicalLimitations(e.target.value)}
          />

          {/* 버튼 섹션 */}
          <Grid container spacing={2} sx={{ mt: 4 }}>
            <Grid item xs={6}>
              <Button variant="outlined" fullWidth onClick={() => navigate('/')}>
                이전
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button type="submit" variant="contained" fullWidth>
                다음
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default SurveyForm;
