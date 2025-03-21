import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./sidebar.css";

const Sidebar = ({ userName = "홍길동", selectedTab, onNavigate, onLogout }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // 프로필 이미지 업로드 처리
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  // 사이드바 열기/닫기
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // 로그아웃 처리
  const handleLogout = () => {
    onLogout();  // ✅ props로 받은 로그아웃 함수 실행
    navigate("/");  // ✅ 로그아웃 후 로그인 페이지로 이동
  };

  // 선택된 탭 상태 관리
  const [activeTab, setActiveTab] = useState(selectedTab || "patientList");

  // URL 변경될 때 활성 탭 변경
  useEffect(() => {
    if (location.pathname.startsWith("/patient/")) {
      setActiveTab("patientDetails");
    } else if (location.pathname === "/patientlist") {
      setActiveTab("patientList");
    } else if (location.pathname === "/comments") {
      setActiveTab("comments");
    }
  }, [location]);

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      {/* 사이드바 열기/닫기 버튼 */}
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isOpen ? "◀" : "▶"}
      </button>

      {isOpen && (
        <div className="sidebar-content">
          {/* 프로필 영역 */}
          <div className="profile">
            <label htmlFor="profile-upload">
              <img
                src={profileImage || "https://via.placeholder.com/80/000000"}
                alt="프로필"
                className="profile-image"
              />
            </label>
            <input
              type="file"
              id="profile-upload"
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />
            <p className="profile-name">{userName}</p>
          </div>

          {/* 메뉴 버튼들 */}
          <button
            className={activeTab === "patientList" ? "active" : ""}
            onClick={() => {
              setActiveTab("patientList");
              navigate("/patientlist");
            }}
          >
            📋 환자 목록
          </button>

          <button
            className={activeTab === "patientDetails" ? "active" : ""}
            onClick={() => {
              setActiveTab("patientDetails");
              navigate("/patient/1");
            }}
          >
            📁 환자정보 및 결과
          </button>

          <button
            className={activeTab === "comments" ? "active" : ""}
            onClick={() => {
              setActiveTab("comments");
              navigate("/commentsPage");
            }}
          >
            ✏️ Comments
          </button>
        </div>
      )}

      {/* 로그아웃 버튼 */}
      <button className="logout-button" onClick={handleLogout}>
        로그아웃
      </button>
    </div>
  );
};

export default Sidebar;
