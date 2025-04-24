import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import ConfessionCard from "../components/ConfessionCard";
import "../styles/Profile.css";

const Profile = () => {
    const [confessions, setConfessions] = useState([]);
    const navigate = useNavigate(); // Initialize navigate for redirection

    useEffect(() => {
        fetchConfessions();
    }, []);

    const fetchConfessions = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/confessions/user/user_63115", {
                credentials: "include", // Include cookies in the request
            });
            const data = await response.json();
            setConfessions(data);
        } catch (error) {
            console.error("Error fetching confessions:", error);
        }
    };

    const deleteConfession = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this confession? This action can't be undone.");
        
        if (!confirmDelete) return; // If the user cancels, do nothing
    
        try {
            const response = await fetch(`http://localhost:5000/api/confessions/${id}`, {
                method: "DELETE",
                credentials: "include",
            });
    
            if (response.ok) {
                setConfessions(confessions.filter((confession) => confession._id !== id));
            } else {
                console.error("Failed to delete confession");
            }
        } catch (error) {
            console.error("Error deleting confession:", error);
        }
    };
    

    // 🔹 Logout function
    const handleLogout = async () => {
        try {
            await fetch("http://localhost:5000/api/auth/logout", {
                method: "POST",
                credentials: "include", // Send cookies
            });

            navigate("/signup"); // Redirect to Signup page
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <div className="all-confessions">
            <h2>Your Confessions</h2>
            <button onClick={handleLogout} className="logout-button">
                Logout
            </button>

            {confessions.length === 0 ? (
                <p>No confessions found</p>
            ) : (
                <div className="confession-list">
                    {confessions.map((confession) => (
                        <ConfessionCard
                            key={confession._id}
                            confession={confession}
                            onDelete={deleteConfession}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Profile;
