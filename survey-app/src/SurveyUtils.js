// 역코딩이 필요한 문항 번호 배열
// export는 해당 파일 내에서 선언한 변수나 함수를 다른 파일에서 불러다 쓸 수 있도록 해주는 것
export const reverseIds = [1,2,3,4,5,6,7,8,18,19,20,21,22,23,24,25,26,27,28];
// 역코딩 함수
export function reverseScore(score, max=5, min=1) {
    return max + min - score;
  }
// 여러 문항에 역코딩을 적용하는 함수
export function applyReverseScore(answers) {
    // 역코딩 된 결과를 담을 객체
    const result = {};
    // answers 매개변수가 {'1': '3', '2': '4', ...} 처럼 질문 ID : 답변 값 형태로 되어있는 개체라고 가정
    // Object.entries() 메서드는 객체의 키-값 쌍을 배열로 반환
    for (const [qid, value] of Object.entries(answers)) {
        // reverseIds 배열에 포함된 질문 ID인 경우 역코딩 적용
        // 삼항 연산자 condition ? expr1 : expr2
        // reverseIds 배열에 qid가 포함되어 있으면 reverseScore(qid) 실행, 아니면 그냥 value 반환
        result[qid] = reverseIds.includes(Number(qid)) ? reverseScore(Number(value)) : Number(value);
    }
    return result;
}

// 점수 변환 함수
const SectionStats =  {
    "암 이후 내 몸의 변화": { mean: 3.09, sd: 0.95 },
    "건강한 삶을 위한 관리": { mean: 3.63, sd: 0.76 },
    "회복을 도와주는 사람들": { mean: 3.84, sd: 0.94 },
    "심리적 부담": { mean: 3.08, sd: 0.91 },
    "사회적 삶의 부담": { mean: 3.39, sd: 1.20 },
    "암 이후 탄력성 및 추가 문항": { mean: 4.28, sd: 0.72 },
    "전체 평균 (암 생존자 건강관리)": { mean: 3.46, sd: 0.65 }
  };
export function newScore(sectionName, userScore) {
    const stat = SectionStats[sectionName];
    if (!stat) return null;
    const z_score = (userScore - stat.mean) / stat.sd;
    return Math.round((z_score * 16.67) + 50);
}