import React, { useEffect, useState } from "react";
import "./CommentsPage.css";

const CommentsPage = () => {
  const [allComments, setAllComments] = useState({});

  useEffect(() => {
    const storedComments = JSON.parse(localStorage.getItem("comments")) || {};
    setAllComments(storedComments);
  }, []);

  return (
    <div>
      <h2>환자별 코멘트</h2>
      {Object.keys(allComments).length > 0 ? (
        Object.keys(allComments).map((patientName) => (
          <div key={patientName}>
            <h3>{patientName} 환자</h3>
            <ul>
              {allComments[patientName].map((comment, index) => (
                <li key={index}>{comment}</li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>저장된 코멘트가 없습니다.</p>
      )}
    </div>
  );
};

export default CommentsPage;
