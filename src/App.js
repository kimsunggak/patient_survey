import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/sidebar";
import PatientList from "./components/patientlist";
import PatientDetails from "./components/PatientDetails";  
import LoginForm from "./components/loginform"; 
import SignupForm from "./components/signupform"; 
import CommentsPage from "./components/CommentsPage";
import Profile from "./components/profile";  // ✅ 프로필 컴포넌트 추가
import "./App.css";

const patientData = [
  { id: 1, name: "가나다 환자", age: 65, gender: "여", department: "간담췌외과", dischargeDate: "2025-12-02", phone: "010-1234-5678", email: "rksek@naver.com", totalScore: 75, status: "양호함" },
  { id: 2, name: "권지용 환자", age: 34, gender: "남", department: "신경외과", dischargeDate: "2025-11-10", phone: "010-9876-5432", email: "gdragon@yg.com", totalScore: 80, status: "양호함" },
];

function App() {
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [currentPage, setCurrentPage] = useState("patientlist");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedSidebar, setSelectedSidebar] = useState("patientlist");

  // ✅ 로그인 상태를 localStorage에서 불러와서 유지
  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleNavigate = (page) => {
    setCurrentPage(page);
    setSelectedSidebar(page);
  };

  const handleLogin = () => {
    localStorage.setItem("isAuthenticated", "true"); // ✅ 로그인 상태 저장
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated"); // ✅ 로그아웃 시 상태 초기화
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="app">
        {/* ✅ 로그인 상태일 때만 사이드바와 프로필 표시 */}
        {isAuthenticated && (
  <>
    <Sidebar selectedTab={currentPage} onNavigate={handleNavigate} onLogout={handleLogout} />
    {currentPage !== "patientlist" && <Profile userName="홍길동" onLogout={handleLogout} />}  {/* ✅ 환자 목록에서는 숨김 */}
  </>
)}


        <div className="content">
          <Routes>
            {/* ✅ 로그인 페이지 (로그인 성공 시 환자 목록으로 이동) */}
            <Route path="/" element={isAuthenticated ? <Navigate to="/patientlist" replace /> : <LoginForm onLogin={handleLogin} />} />
            
            {/* ✅ 회원가입 페이지 */}
            <Route path="/signup" element={<SignupForm />} />

            {/* ✅ 로그인한 경우에만 상세 페이지 접근 가능 */}
            <Route path="/patientlist" element={isAuthenticated ? <PatientList onPatientClick={setSelectedPatientId} /> : <Navigate to="/" replace />} />
            <Route path="/patient/:id" element={isAuthenticated ? <PatientDetails patientData={patientData} onSelectSidebar={setSelectedSidebar} /> : <Navigate to="/" replace />} />

            {/* ✅ CommentsPage 라우팅 오류 수정 ("/commentsPage") */}
            <Route path="/commentsPage" element={isAuthenticated ? <CommentsPage /> : <Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
