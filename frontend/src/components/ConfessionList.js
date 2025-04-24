import React, { useState, useEffect } from "react";

const ConfessionList = ({ loggedInUserId }) => {
    const [confessions, setConfessions] = useState([]);

    // Fetch Confessions
    useEffect(() => {
        fetch("http://localhost:5174/confessions")
            .then((res) => res.json())
            .then((data) => setConfessions(data))
            .catch((err) => console.error("Error fetching confessions:", err));
    }, []);

    // ✅ Handle Like
    const handleLike = async (confessionId) => {
        try {
            const response = await fetch(`http://localhost:5174/confessions/${confessionId}/like`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: loggedInUserId }),
            });

            const data = await response.json();
            if (response.ok) {
                setConfessions((prevConfessions) =>
                    prevConfessions.map((conf) =>
                        conf._id === confessionId ? { ...conf, likes: data.likes, likedBy: data.likedBy } : conf
                    )
                );
            }
        } catch (error) {
            console.error("Error liking confession", error);
        }
    };

    // ✅ Handle Super-Like
    const handleSuperLike = async (confessionId) => {
        try {
            const response = await fetch(`http://localhost:5174/confessions/${confessionId}/superlike`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: loggedInUserId }),
            });

            const data = await response.json();
            if (response.ok) {
                setConfessions((prevConfessions) =>
                    prevConfessions.map((conf) =>
                        conf._id === confessionId ? { ...conf, superLikes: data.superLikes, superLikedBy: data.superLikedBy } : conf
                    )
                );
            }
        } catch (error) {
            console.error("Error super-liking confession", error);
        }
    };

    return (
        <div>
            {confessions.map((conf) => (
                <div key={conf._id} className="confession-box">
                    <p>{conf.confessionText}</p>

                    <button
                        onClick={() => handleLike(conf._id)}
                        className={conf.likedBy.includes(loggedInUserId) ? "btn-liked" : "btn"}
                    >
                        ❤️ {conf.likes}
                    </button>

                    <button
                        onClick={() => handleSuperLike(conf._id)}
                        className={conf.superLikedBy.includes(loggedInUserId) ? "btn-superliked" : "btn"}
                    >
                        🔥 {conf.superLikes}
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ConfessionList;
