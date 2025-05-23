// Firestore에서 필요한 함수 가져오기
import { 
  collection, 
  addDoc, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Firestore 인스턴스 가져오기

// 사용자 데이터를 Firestore에 저장하는 함수
const saveUserData = async (data) => {
  try {
    const docRef = doc(db, 'users', data.name); // 사용자의 이름을 문서 ID로 사용
    await setDoc(docRef, data); // 데이터 저장
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export { saveUserData };

// 사용자별 answers를 저장하는 함수
export const saveUserAnswers = async (userName, answers) => {
  try {
    const userRef = doc(db, 'users', userName); // Firestore에서 사용자 문서 참조
    const snap = await getDoc(userRef);
    const existing = snap.exists() && snap.data().answers ? snap.data().answers : {};
    const merged = { ...existing, ...answers };
    await setDoc(userRef, { answers: merged }, { merge: true });
    console.log(`Answers saved for ${userName}`, merged);
  } catch (error) {
    console.error('Error saving answers:', error);
  }
};

// 사용자별 answers를 불러오는 함수
export const getUserAnswers = async (userName) => {
  try {
    const userRef = doc(db, 'users', userName);
    const snap = await getDoc(userRef);
    return snap.exists() ? snap.data().answers : {};
  } catch (e) {
    console.error("Error getting user answers: ", e);
    throw e;
  }
};

/**
 * 사용자의 표준화된 점수(stdScores)를 저장하는 함수
 * @param {string} userName - 사용자 이름
 * @param {Object} stdScores - 섹션별 표준화된 점수
 * @param {Object} additionalData - 추가로 저장할 데이터 (선택사항)
 * @returns {Promise<string>} - 저장된 문서의 ID
 */
export const saveStdScores = async (userName, stdScores, additionalData = {}) => {
  try {
    // 사용자 문서 참조
    const userRef = doc(db, 'users', userName);
    
    // 기존 데이터 확인
    const userDoc = await getDoc(userRef);
    const existingData = userDoc.exists() ? userDoc.data() : {};
    
    // 새로운 설문 결과 문서 생성
    const surveyResultRef = await addDoc(collection(db, 'survey_results'), {
      userName,
      stdScores: {
        physicalChange: stdScores.physicalChange,
        healthManagement: stdScores.healthManagement,
        support: stdScores.support,
        psychologicalBurden: stdScores.psychologicalBurden,
        socialBurden: stdScores.socialBurden,
        resilience: stdScores.resilience
      },
      // 추가 데이터
      ...additionalData,
      // 타임스탬프 추가
      createdAt: serverTimestamp()
    });

    // 사용자 문서에 최신 설문 결과 ID 업데이트
    await setDoc(userRef, {
      ...existingData,
      latestSurveyResult: surveyResultRef.id,
      updatedAt: serverTimestamp()
    }, { merge: true });

    console.log('표준화 점수가 성공적으로 저장되었습니다. 문서 ID:', surveyResultRef.id);
    return surveyResultRef.id;
  } catch (error) {
    console.error('표준화 점수 저장 중 오류 발생:', error);
    throw error;
  }
};

/**
 * 사용자의 최신 표준화 점수를 가져오는 함수
 * @param {string} userName - 사용자 이름
 * @returns {Promise<Object|null>} - 표준화 점수 데이터 또는 null
 */
export const getLatestStdScores = async (userName) => {
  try {
    const userRef = doc(db, 'users', userName);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      return null;
    }

    const userData = userDoc.data();
    if (!userData.latestSurveyResult) {
      return null;
    }

    const surveyResultRef = doc(db, 'survey_results', userData.latestSurveyResult);
    const surveyResultDoc = await getDoc(surveyResultRef);

    if (!surveyResultDoc.exists()) {
      return null;
    }

    return surveyResultDoc.data().stdScores;
  } catch (error) {
    console.error('표준화 점수 조회 중 오류 발생:', error);
    throw error;
  }
};

/**
 * 사용자의 모든 설문 결과를 가져오는 함수
 * @param {string} userName - 사용자 이름
 * @returns {Promise<Array>} - 설문 결과 배열
 */
export const getAllSurveyResults = async (userName) => {
  try {
    const userRef = doc(db, 'users', userName);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      return [];
    }

    const userData = userDoc.data();
    const results = [];

    // 사용자의 모든 설문 결과 조회
    const surveyResultsRef = collection(db, 'survey_results');
    const querySnapshot = await getDocs(query(
      surveyResultsRef,
      where('userName', '==', userName),
      orderBy('createdAt', 'desc')
    ));

    querySnapshot.forEach((doc) => {
      results.push({
        id: doc.id,
        ...doc.data()
      });
    });

    return results;
  } catch (error) {
    console.error('설문 결과 조회 중 오류 발생:', error);
    throw error;
  }
};