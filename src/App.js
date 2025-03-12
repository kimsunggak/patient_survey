import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PatientInfoForm from './components/PatientInfoForm';
import SurveySection1 from './components/SurveySection1';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<PatientInfoForm />} />
          <Route path="/survey/section1" element={<SurveySection1 />} />
          {/* 추후 추가 설문조사 섹션 라우트 추가 예정 */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
