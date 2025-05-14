// Firebase DB 인스턴스 가져오기
import { db } from '../firebase';
// Firebase Firestore에서 제공하는 메서드들 가져오기 - 컬렉션 : NoSQL DB 저장 구조
// doc() : 컬렉션 내의 문서에 대한 참조를 생성 - 문서 ID 지정
// setDoc() : 특정 문서에 데이터를 저장하는 함수
// getDoc() : 특정 문서의 데이터를 가져오는 함수
import { collection, addDoc, doc, setDoc, getDoc } from 'firebase/firestore';

// 사용자 데이터를 Firestore에 저장하는 함수
const saveUserData = async (data) => {
    // 
    try {
    // DB 인스턴스에서 'users'라는 이름의 컬렉션을 참조, data.name을 문서 ID로 사용, ex) '홍길동'같은 값을 주소로 사용한다는 말임
    const docRef = doc(db, 'users', data.name);
    // docRef가 가르키는 문서(firestore)에 data객체를 저장
    await setDoc(docRef, data);
    // data.name 값 출력
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
// 외부에서 사용할 수 있도록 export
export { saveUserData };

// 사용자별 answers를 저장하는 함수
export const saveUserAnswers = async (userName, answers) => {
  try {
    const userRef = doc(db, 'users', userName);
    // 사용자 이름이 담긴 문서 가져오기기
    const snap = await getDoc(userRef);
    // exists() : 문서가 존재하는지 확인 - 존재하면 true, 아니면 false
    // A && B ? C : D A와 B가 모두 참이면 C를 반환, 아니면 D를 반환
    // 문서가 존재하고 answers가 존재하면 기존 answers를 가져오고, 아니면 빈 객체를 반환
    const existing = snap.exists() && snap.data().answers ? snap.data().answers : {};
    // 기존 데이터에 새로운 데이터 들어오면 덮어쓰기
    // ... : 스프레드 연산자 - 객체 펼치기
    const merged = { ...existing, ...answers };
    // 문서에 merged된 answers 저장 - 지정된 필드만 업데이트
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
    // ? 는 if...else 문과 같음
    return snap.exists() ? snap.data().answers : {};
  } catch (e) {
    console.error("Error getting user answers: ", e);
    throw e;
  }
};