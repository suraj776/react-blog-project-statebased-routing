import React, { useState } from "react";

const CommentBox = ({ blogId, sourceId, onCommentAdd, placeholder }) => {
  const [comment, setComment] = useState("");

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    onCommentAdd(sourceId, comment,blogId);
    setComment("");
  };

  return (
    <div className="form-group">
      <textarea
        placeholder={placeholder}
        value={comment}
        onChange={handleCommentChange}
        className="form-control"
      />
      <div className="form-group p-3">
      <button className="btn header-button"onClick={handleCommentSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default CommentBox;
