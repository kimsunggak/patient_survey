import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./CommentsPage.css";

const CommentsPage = () => {
  const [allComments, setAllComments] = useState({});
  const [newComment, setNewComment] = useState(""); // 입력할 코멘트
  const [selectedPatient, setSelectedPatient] = useState(""); // 선택한 환자
  const [editingIndex, setEditingIndex] = useState(null); // 수정 중인 코멘트 인덱스
  const [editedComment, setEditedComment] = useState(""); // 수정할 코멘트
  const location = useLocation();
  const patientNameFromUrl = new URLSearchParams(location.search).get("patient"); // URL에서 환자 이름 가져오기

  useEffect(() => {
    const storedComments = JSON.parse(localStorage.getItem("comments")) || {};
    setAllComments(storedComments);
  }, []);

  // 🔄 로컬 스토리지에 코멘트 저장
  const saveCommentsToStorage = (comments) => {
    localStorage.setItem("comments", JSON.stringify(comments));
  };

  // 📝 코멘트 추가
  const addComment = () => {
    if (!selectedPatient || !newComment.trim()) return; // 빈 입력 방지
    const updatedComments = {
      ...allComments,
      [selectedPatient]: [...(allComments[selectedPatient] || []), { text: newComment, date: new Date().toLocaleString() }],
    };
    setAllComments(updatedComments);
    saveCommentsToStorage(updatedComments);
    setNewComment(""); // 입력창 초기화
  };

  // ✏️ 코멘트 수정 모드 활성화
  const startEditing = (patient, index, comment) => {
    setEditingIndex(index);
    setEditedComment(comment.text);
  };

  // 💾 코멘트 수정 저장
  const saveEditedComment = (patient, index) => {
    const updatedComments = { ...allComments };
    updatedComments[patient][index].text = editedComment;
    setAllComments(updatedComments);
    saveCommentsToStorage(updatedComments);
    setEditingIndex(null);
  };

  // 🗑️ 코멘트 삭제
  const deleteComment = (patient, index) => {
    const updatedComments = { ...allComments };
    updatedComments[patient].splice(index, 1);
    if (updatedComments[patient].length === 0) delete updatedComments[patient];
    setAllComments(updatedComments);
    saveCommentsToStorage(updatedComments);
  };

  return (
    <div className="comments-page">
      <h2>환자별 코멘트 목록</h2>

      {/* 🔹 모든 환자에 대한 코멘트 입력 가능 (드롭다운 추가) */}
      <div className="comment-input-container">
        <select value={selectedPatient} onChange={(e) => setSelectedPatient(e.target.value)}>
          <option value="">환자 선택</option>
          {Object.keys(allComments).map((patient) => (
            <option key={patient} value={patient}>
              {patient}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="코멘트를 입력하세요..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={addComment}>➕</button>
      </div>

      {/* 📋 저장된 코멘트 목록 */}
      {Object.keys(allComments).length > 0 ? (
        Object.keys(allComments).map((patient) => (
          <div key={patient} className="comment-section">
            <h3>{patient} 환자</h3>
            {allComments[patient].map((comment, index) => (
              <div key={index} className="comment-item">
                <div className="comment-text">
                  {editingIndex === index ? (
                    <input
                      type="text"
                      value={editedComment}
                      onChange={(e) => setEditedComment(e.target.value)}
                    />
                  ) : (
                    <>
                      <p>{comment.text}</p>
                      <small>{comment.date}</small>
                    </>
                  )}
                </div>

                <div className="comment-actions">
                  {editingIndex === index ? (
                    <>
                      <button onClick={() => saveEditedComment(patient, index)}>✔️</button>
                      <button onClick={() => setEditingIndex(null)}>❌</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => startEditing(patient, index, comment)}>✏️</button>
                      <button onClick={() => deleteComment(patient, index)}>🗑️</button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))
      ) : (
        <p>저장된 코멘트가 없습니다.</p>
      )}
    </div>
  );
};

export default CommentsPage;
