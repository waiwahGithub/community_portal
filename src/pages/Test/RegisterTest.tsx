import axios from "axios";
import React, { useState } from "react";

const RegistrationForm = () => {
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
      // Send registration data to the backend API to register the user
      const response = await axios.post(
        "http://localhost:8080/auth/register",
        formData
      ); // Replace with your backend API URL

      // Handle the registration success, e.g., show a success message
      console.log("Registration successful");
    } catch (error) {
      // Handle registration errors, e.g., show an error message
      console.error("Registration failed", error);
    }
  };

  return (
    <div>
      <h2>Registration</h2>
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
          Register
        </button>
        <p className="border">
          {formData.username} && {formData.password}{" "}
        </p>
      </form>
    </div>
  );
};

export default RegistrationForm;
