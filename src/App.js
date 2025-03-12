import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PatientInfoForm from './components/PatientInfoForm';
import SurveySection1 from './components/SurveySection1';
import SurveySection2 from './components/SurveySection2';
import SurveySection3 from './components/SurveySection3';
import SurveySection4 from './components/SurveySection4';
import SurveySection5 from './components/SurveySection5';
import SurveySection6 from './components/SurveySection6';
import SurveySection7 from './components/SurveySection7';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<PatientInfoForm />} />
          <Route path="/survey/section1" element={<SurveySection1 />} />
          <Route path="/survey/section2" element={<SurveySection2 />} />
          <Route path="/survey/section3" element={<SurveySection3 />} />
          <Route path="/survey/section4" element={<SurveySection4 />} />
          <Route path="/survey/section5" element={<SurveySection5 />} />
          <Route path="/survey/section6" element={<SurveySection6 />} />
          <Route path="/survey/section7" element={<SurveySection7 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
