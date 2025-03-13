# 🏥 암 환자를 위한 퇴원 설문조사 & 환자 관리 웹사이트

![GitHub repo size](https://img.shields.io/github/repo-size/your-repo-name.svg)
![GitHub last commit](https://img.shields.io/github/last-commit/your-repo-name.svg)
![GitHub contributors](https://img.shields.io/github/contributors/your-repo-name.svg)

퇴원을 앞둔 암 환자들이 설문을 통해 자신의 상태를 점검하고, 사회복지사가 환자의 데이터를 관리할 수 있도록 돕는 **설문조사 및 환자 관리 웹사이트**입니다.

---

## 📌 프로젝트 개요

### 🎯 **프로젝트 목표**
- 환자가 온라인 설문을 진행하고, **결과 점수 및 상태 메시지** 확인
- 사회복지사가 **환자 목록을 열람, 설문 결과를 관리 및 코멘트 작성**
- **두 개의 웹사이트(환자용 / 사회복지사용) 구축**

### 🔗 **웹사이트 구성**
1️⃣ **환자용 설문조사 사이트**
   - 환자 정보 입력 후 **7개 섹션**의 설문 진행  
   - 점수에 따라 결과 메시지 제공 (예: 80점 이상 ‘양호’, 20점 미만 ‘면담 필요’)

2️⃣ **사회복지사용 환자 관리 사이트**
   - **로그인 후 환자 목록 조회**  
   - 개별 환자 **설문 결과 확인 및 코멘트 작성** 기능

---

## 💻 필수 요구사항

- **Node.js** (최소 v14 이상 권장)
- **npm** (Node Package Manager)

---

## 📦 설치 및 실행

### 1. 저장소 클론 및 설치
```bash
# 저장소 클론
git clone https://github.com/your-repo-name.git
cd your-repo-name

# React 관련 라이브러리 설치
cd frontend
npm install

# 프론트엔드 개발 서버 실행 (기본적으로 http://localhost:3000 에서 실행)
npm start

🔧 백엔드 연동 및 주의사항
프론트엔드(포트 3000)와 백엔드(포트 5000)가 다른 포트에서 실행될 경우, 백엔드 서버에서 CORS 설정을 통해 프론트엔드의 요청을 허용해야 함
