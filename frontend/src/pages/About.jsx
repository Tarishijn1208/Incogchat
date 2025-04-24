import React from "react";
import "../styles/About.css"; // Make sure to create this CSS file for styling

const About = () => {
  return (
    <div className="about-container">
      <h2>About Us</h2>
      <p>
        Welcome to ConfessHub – a place where you can share your thoughts anonymously.  
        Our platform allows users to express their feelings, secrets, and experiences  
        without fear of judgment.
      </p>

      <h3>Our Mission</h3>
      <p>
        We believe in the power of anonymous expression.  
        Whether it's a secret, a confession, or just something you need to get off your chest,  
        ConfessHub provides a safe space to share.
      </p>

      <h3>Why Choose Us?</h3>
      <ul>
        <li>🌟 100% Anonymity</li>
        <li>🔒 Secure & Safe Platform</li>
        <li>❤️ Share & Support Community</li>
      </ul>

      <h3>Meet the Creators</h3>
      <p className="creators">
        Developed by <strong>Neel Lathiya</strong>, <strong>Tarishi Jain</strong>, and <strong>Hiten Katariya</strong>.
      </p>

      <p>Join us and start confessing today!</p>
    </div>
  );
};

export default About;
