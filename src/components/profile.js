import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // ✅ 네비게이션 추가
import "./profile.css";

const Profile = ({ userName, onLogout }) => {
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();  // ✅ 페이지 이동을 위한 useNavigate

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  /* const handleLogout = () => {
    onLogout();  // ✅ 상위 컴포넌트(App.js)에서 전달된 로그아웃 함수 실행
    navigate("/");  // ✅ 로그아웃 후 로그인 페이지로 이동
  };*/

  return (
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
      <p>{userName}</p>
      
      {/*
  ✅ 로그아웃 버튼 숨기기
  <button className="logout-button" onClick={handleLogout}>
    로그아웃
  </button>
*/}

    </div>
  );
};

export default Profile;
