import React, { useState } from "react";
import "./CommentWidget.css";

const CommentWidget = ({ patientId, addComment }) => {
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    addComment(newComment); // ✅ 부모 컴포넌트 (`PatientDetails.js`)에서 전달받은 addComment 실행
    setNewComment(""); // ✅ 입력창 초기화
  };

  return (
    <div className="comment-widget">
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="코멘트를 입력하세요..."
      />
      <button onClick={handleAddComment}>등록</button>
    </div>
  );
};

export default CommentWidget;
