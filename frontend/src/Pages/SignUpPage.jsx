import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SignUpPage.css";
import "./AuthPages.css";

const SignUpPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const FormData = {
      name: form.username.value,
      email: form.email.value,
      password: form.password.value,
    };
    try {
      const response = await axios.post("/api/SignUp/AddUser", FormData);
      if (response.data.out === false) {
        alert(response.data.message);
        navigate("/Home");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Failed to sign up. Please try again.");
    }
  };

  const goToSignIn = () => {
    navigate("/signin");
  };

  return (
    <div className="signup-container">
      <h2>Create an Account</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" placeholder="Enter username" required />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" placeholder="Enter email" required />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" placeholder="Enter password" required />

        <button type="submit">Sign Up</button>
      </form>
      <p style={{ marginTop: "15px", textAlign: "center" }}>
        Already have an account?{" "}
        <button onClick={goToSignIn} style={{ color: "#0077cc", background: "none", border: "none", cursor: "pointer", textDecoration: "underline", padding: 0 }}>
          Sign In
        </button>
      </p>
    </div>
  );
};

export default SignUpPage;
