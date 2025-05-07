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
// 점수별 집단 분류 함수
export function getRiskGroup(sectionName, meanScore) {
    const stat = SectionStats[sectionName];
    if (!stat) return null;
    // 섹션별 점수 지표 가져와서 cut-off score 계산
    const cutoff = stat.mean - stat.sd;
    if (meanScore <= cutoff) return "고위험집단";
    if (meanScore <= stat.mean) return "주의집단";
    return "저위험집단";
  }
// 설문조사 결과(집단)에 따른 고정 코멘트 
export const Comments = {
  patient: {
    "고위험집단": "🩺검사 결과를 보니 도움이 필요해 보여요. 혹시 불편한 점이 있으면 언제든 편하게 전문가와 상담해 보세요. 함께 곁에서 도와드릴게요❤️",
    "주의집단": "주기적인 점검과 관심이 필요합니다. 건강 상태를 꾸준히 확인해 주세요.😊",
    "저위험집단": "현재 양호한 상태를 유지하고 있습니다🌟 지금처럼 건강을 잘 관리해 주세요.계속 응원할게요🎉👍"
  },
  socialWorker: {
    "고위험집단": "환자가 고위험집단에 해당합니다. 추가적인 개입 및 전문 상담 연계가 필요합니다.",
    "주의집단": "환자가 주의집단에 해당합니다. 정기적인 모니터링과 예방적 지원이 권장됩니다.",
    "저위험집단": "환자가 저위험집단에 해당합니다. 현재 상태를 유지할 수 있도록 지속적인 격려가 필요합니다."
  }
};
// 메인 코멘트만 반환
export function getPatientComment(group) {
  return Comments.patient[group] || "";
}
// 추가 안내 코멘트 반환
export function getPatientExtraComment(reason12_1) {
  const commentConditions = [
    "무엇을 해야 할지 몰라서",
    "건강관리 자체를 스트레스라고 생각해서",
    "의지가 없어서"
  ];
  if (Array.isArray(reason12_1) && reason12_1.some(r => commentConditions.includes(r))) {
    return "참여자님은 사회복지사나 상담가와의 상담을 강력 권장합니다🚨";
  }
  return "";
}