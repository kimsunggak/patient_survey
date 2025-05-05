import React, { useState } from "react";

const scaleChoices = [
  "전혀 그렇지 않다",
  "약간 그렇지 않다",
  "보통이다",
  "약간 그렇다",
  "매우 그렇다",
];

// 1. 암 이후 내 몸의 변화
const section1 = [
  { id: 1, text: "암 발병 전과 비교해서 무언가에 집중하기 어렵다" },
  { id: 2, text: "암 발병 전과 비교해서 무언가를 기억하는데 어려움이 있다" },
  { id: 3, text: "암 발병 전과 비교해서 성생활에 어려움을 느낀다" },
  { id: 4, text: "암 치료 이후 현재 우울감을 느낀다" },
  { id: 5, text: "암 발병 이후, 수면에 어려움이 있다" },
  { id: 6, text: "암 치료로 인해 일상생활에 불편함(부종·경직 등)을 느낀다" },
  { id: 7, text: "체력 저하로 인해 피로감을 느낀다" },
  { id: 8, text: "암 발병 전과 비교해서 적정 체중을 유지하기 어렵다" },
];

// 2. 건강한 삶을 위한 관리
const section2 = [
  { id: 9, text: "여러 가지 식품군을 골고루 섭취한다 (예: 균형식)" },
  { id: 10, text: "암 진단 및 치료 이후, 규칙적인 운동을 하고 있다" },
  { id: 11, text: "규칙적인 식사를 한다" },
  { id: 12, text: "내가 생각한 건강관리 방법을 잘 실천하고 있다" },
  { id: 13, text: "암 진단 및 치료 이후, 식이조절을 한다" },
];
const reasons12_1 = [
  "무엇을 해야 할지 몰라서",
  "건강관리 자체를 스트레스라고 생각해서",
  "의지가 없어서",
  "시간이 많이 걸려서",
  "가족이 도와주지 않아서",
  "경제적으로 부담이 돼서",
  "기타",
];
const diet13_1_items = [
  "조미료 섭취를 줄인다",
  "식품의 신선도를 중요시한다",
  "채식 및 과일 위주의 식습관을 한다",
  "육류 섭취를 조절한다",
  "탄수화물 섭취를 조절한다",
  "항암식품(예: 버섯, 도라지 등)을 먹는다",
];

// 3. 회복을 도와주는 사람들
const section3 = [
  { id: 14, text: "우리 가족은 나에게 실질적인 도움을 주고 있다" },
  { id: 15, text: "우리 가족은 나에게 충분한 관심과 사랑을 주고 있다" },
  { id: 16, text: "내 성격이 암을 견뎌내는 데 도움이 되고 있다" },
  { id: 17, text: "내 친구들은 나에게 충분한 관심과 위로를 주고 있다" },
];
const reasons15_1 = [
  "기대감이 낮아서",
  "도와줄 수 있는 가족이 없어서",
  "가족이 바빠서",
  "가족의 무심한 성격 때문에",
  "나를 환자로 대하지 않아서",
  "기타",
];

// 4. 심리적 부담
const section4 = [
  { id: 18, text: "암 치료 및 건강관리와 관련해서 가족과 의견차이가 있다" },
  { id: 19, text: "재발에 대한 불안을 느낀다" },
  { id: 20, text: "죽음에 대한 두려움이 있다" },
  { id: 21, text: "앞으로의 인생에 대한 걱정이 있다" },
  { id: 22, text: "암 진단 및 치료를 생각하면 지금도 두려움을 느낀다" },
  { id: 23, text: "암으로 인해 건강관리를 해야 한다는 생각 때문에 스트레스를 받는다" },
  { id: 24, text: "암 진단 후, 가정에서 맡았던 역할 변화로 혼란을 경험한 적이 있다" },
  { id: 25, text: "암으로 인해 해야 할 일을 못해 죄책감을 느낀다" },
];

// 5. 사회적 삶의 부담
const section5 = [
  { id: 26, text: "암 발병 전과 비교해서 다른 사람과 잘 어울리지 못한다" },
  { id: 27, text: "암 발병 전과 비교해서 사회생활(취미·봉사·직장 등)이 어렵다" },
  { id: 28, text: "암 발병으로 인한 취업·직장 복귀 부담감을 느낀다" },
];

// 6. 암 이후 탄력성
const section6 = [
  { id: 29, text: "암 치료가 끝났지만, 여전히 건강관리는 중요하다고 느낀다" },
  { id: 30, text: "나는 암을 잘 견뎌냈다는 자신감이 있다" },
  { id: 31, text: "암 발병 후, 내 인생을 긍정적으로 보고 있다" },
];

// 7. 추가 문항
const section7 = [
  { id: 32, text: "암 발병 이후, 절주하고 있다" },
  { id: 33, text: "암 발병 이후, 금연하고 있다" },
];

function Section({ title, questions, answers, handleChange }) {
  return (
    <section style={{ marginBottom: "2rem" }}>
      <h3>{title}</h3>
      {questions.map((q) => (
        <div key={q.id} style={{ marginBottom: "1rem" }}>
          <div>{q.id}. {q.text}</div>
          <div>
            {scaleChoices.map((choice, idx) => (
              <label key={idx} style={{ marginRight: "1rem" }}>
                <input
                  type="radio"
                  name={`q${q.id}`}
                  value={idx + 1}
                  checked={answers[q.id] === String(idx + 1)}
                  onChange={(e) => handleChange(q.id, e.target.value)}
                  required
                />
                {choice}
              </label>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

function MultiCheckSection({ title, options, checked, onChange, etcValue, onEtcChange }) {
  return (
    <section style={{ marginBottom: "2rem" }}>
      <h4>{title}</h4>
      {options.map((opt, idx) =>
        opt === "기타" ? (
          <div key={opt}>
            <label>
              <input
                type="checkbox"
                checked={checked.includes(opt)}
                onChange={() => onChange(opt)}
              /> 기타:
              <input
                type="text"
                value={etcValue}
                onChange={onEtcChange}
                disabled={!checked.includes("기타")}
                style={{ marginLeft: 8 }}
              />
            </label>
          </div>
        ) : (
          <label key={opt} style={{ marginRight: "1rem" }}>
            <input
              type="checkbox"
              checked={checked.includes(opt)}
              onChange={() => onChange(opt)}
            />
            {opt}
          </label>
        )
      )}
    </section>
  );
}

function MultiRadioSection({ title, items, answers, handleChange }) {
  return (
    <section style={{ marginBottom: "2rem" }}>
      <h4>{title}</h4>
      {items.map((item, idx) => (
        <div key={item} style={{ marginBottom: "0.5rem" }}>
          <span>{item}</span>
          {scaleChoices.map((choice, i) => (
            <label key={i} style={{ marginLeft: "1rem" }}>
              <input
                type="radio"
                name={`diet13_1_${idx}`}
                value={i + 1}
                checked={answers[idx] === String(i + 1)}
                onChange={(e) => handleChange(idx, e.target.value)}
                required
              />
              {choice}
            </label>
          ))}
        </div>
      ))}
    </section>
  );
}

function SurveyForm() {
  const [answers, setAnswers] = useState({});
  const [multi12_1, setMulti12_1] = useState([]);
  const [etc12_1, setEtc12_1] = useState("");
  const [diet13_1, setDiet13_1] = useState({});
  const [multi15_1, setMulti15_1] = useState([]);
  const [etc15_1, setEtc15_1] = useState("");

  const handleChange = (qid, value) => {
    setAnswers({ ...answers, [qid]: value });
  };
  const handleMulti12_1 = (value) => {
    setMulti12_1((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };
  const handleDiet13_1 = (idx, value) => {
    setDiet13_1({ ...diet13_1, [idx]: value });
  };
  const handleMulti15_1 = (value) => {
    setMulti15_1((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      JSON.stringify(
        {
          ...answers,
          "12-1": multi12_1,
          "12-1-etc": etc12_1,
          "13-1": diet13_1,
          "15-1": multi15_1,
          "15-1-etc": etc15_1,
        },
        null,
        2
      )
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>설문조사</h2>
      <Section title="1. 암 이후 내 몸의 변화" questions={section1} answers={answers} handleChange={handleChange} />
      <Section title="2. 건강한 삶을 위한 관리" questions={section2} answers={answers} handleChange={handleChange} />
      <MultiCheckSection
        title="12-1. 건강관리를 잘 하지 못하는 이유 (해당 항목 모두 체크)"
        options={reasons12_1}
        checked={multi12_1}
        onChange={handleMulti12_1}
        etcValue={etc12_1}
        onEtcChange={(e) => setEtc12_1(e.target.value)}
      />
      <MultiRadioSection
        title="13-1. 식이조절 항목별 실천 정도"
        items={diet13_1_items}
        answers={diet13_1}
        handleChange={handleDiet13_1}
      />
      <Section title="3. 회복을 도와주는 사람들" questions={section3} answers={answers} handleChange={handleChange} />
      <MultiCheckSection
        title="15-1. 가족의 도움·관심이 부족한 이유 (해당 항목 모두 체크)"
        options={reasons15_1}
        checked={multi15_1}
        onChange={handleMulti15_1}
        etcValue={etc15_1}
        onEtcChange={(e) => setEtc15_1(e.target.value)}
      />
      <Section title="4. 심리적 부담" questions={section4} answers={answers} handleChange={handleChange} />
      <Section title="5. 사회적 삶의 부담" questions={section5} answers={answers} handleChange={handleChange} />
      <Section title="6. 암 이후 탄력성" questions={section6} answers={answers} handleChange={handleChange} />
      <Section title="7. 추가 문항" questions={section7} answers={answers} handleChange={handleChange} />
      <button type="submit">제출</button>
    </form>
  );
}

export default SurveyForm;
