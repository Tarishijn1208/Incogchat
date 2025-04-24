import React from "react";
import "../styles/ConfessionCard.css"; // Ensure you have the same CSS as homepage

const ConfessionCard = ({ confession, onDelete }) => {
  return (
    <div className="confession-card">
      <p className="confession-text">{confession.confessionText || "No text available"}</p>
      <div className="confession-info">
        <span>❤️ {confession.likes}</span>
        <span>🔥 {confession.superLikes}</span>
      </div>
      <p className="confession-date">{new Date(confession.createdAt).toLocaleString()}</p>
      {onDelete && <button onClick={() => onDelete(confession._id)}>Delete</button>}
    </div>
  );
};

export default ConfessionCard;
