// src/utils/firebaseUtils.js
import { db } from '../firebase';
import { collection, addDoc, doc, setDoc, getDoc } from 'firebase/firestore';

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
    const userRef = doc(db, 'users', userName);
    // 기존 answers 불러오기
    const snap = await getDoc(userRef);
    const existing = snap.exists() && snap.data().answers ? snap.data().answers : {};
    // 새로운 answers와 병합
    const merged = { ...existing, ...answers };
    await setDoc(userRef, { answers: merged }, { merge: true });
    console.log(`Answers saved for ${userName}`, merged);
  } catch (e) {
    console.error("Error saving answers: ", e);
    throw e;
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
