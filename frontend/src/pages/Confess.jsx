import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Confess.css"; // Import styles

const Confess = () => {
  const [confessionText, setConfessionText] = useState("");
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null); // Store user ID

  // Get userId from localStorage on component mount
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    console.log("User ID from localStorage:", storedUserId); // Debugging
    setUserId(storedUserId);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("User not logged in!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/confessions/add", {
        userId,
        confessionText,
      });

      if (response.status === 201) {
        alert("Confession added successfully!");
        navigate("/home"); // Redirect to home after submission
      } else {
        alert("Failed to add confession");
      }
    } catch (error) {
      console.error("Error adding confession:", error);
      alert("Server error. Try again!");
    }
  };

  return (
    <div className="confess-page">
      <h2>Confess</h2>
      <p>User ID: {userId}</p> {/* Show user ID for debugging */}
      <form className="confess-form" onSubmit={handleSubmit}>
        <textarea
          className="confess-input"
          placeholder="Write your confession here..."
          value={confessionText}
          onChange={(e) => setConfessionText(e.target.value)}
          required
        />
        <button type="submit" className="confess-submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Confess;
