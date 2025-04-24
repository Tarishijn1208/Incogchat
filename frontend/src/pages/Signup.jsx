import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { signup } from "../api";
import "../styles/auth.css";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", gender: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(form);
      alert("Signup successful !!");
      navigate("/home");
    } catch (error) {
      alert("Signup failed. Try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="text-white font-weight-bold mb-3">Signup</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Control
            type="text"
            placeholder="Name"
            className="auth-input"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <Form.Control
            type="email"
            placeholder="Email"
            className="auth-input"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <Form.Control
            type="password"
            placeholder="Password"
            className="auth-input"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          {/* ✅ Add Gender Selection */}
          {/* ✅ Gender Selection */}
          <div className="gender-container">
            <label className="text-white">Gender: </label>
            <div className="gender-options">
              <Form.Check
                type="radio"
                label="Male"
                name="gender"
                value="Male"
                onChange={(e) => setForm({ ...form, gender: e.target.value })}
                required
              />
              <Form.Check
                type="radio"
                label="Female"
                name="gender"
                value="Female"
                onChange={(e) => setForm({ ...form, gender: e.target.value })}
                required
              />
            </div>
          </div>


          <Button type="submit" className="auth-button">
            Signup
          </Button>
        </Form>
        <p className="auth-text">
          Already have an account?{" "}
          <Button className="auth-link" onClick={() => navigate("/login")}>
            Login
          </Button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
