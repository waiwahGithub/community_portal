import axios from "axios";
import React, { useState } from "react";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      // Send login data to the backend API to obtain a JWT token
      const response = await axios.post(
        "http://localhost:8080/auth/login",
        formData
      ); // Replace with your API endpoint

      // Assuming the backend returns a JWT token in the response
      const token = response.data;

      // Store the token in local storage or a secure storage mechanism
      // You should also handle token expiration and renew it as needed

      // Redirect to a protected route or perform other actions upon successful login
      console.log("Login successful", token);
    } catch (error) {
      // Handle login errors here, e.g., show an error message
      console.error("Login failed", error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="border"
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="border"
          />
        </div>
        <button type="submit" className="border">
          Login
        </button>
        <p className="border">
          {formData.username} && {formData.password}{" "}
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
