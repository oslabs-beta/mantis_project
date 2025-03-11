import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface RegisterProps {
  onRegisterSuccess?: (user: LoggedInUser) => void;
}

const Register: React.FC<RegisterProps> = ({ onRegisterSuccess }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password || !username) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/create-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        alert("Registration failed");
        return;
      }

      const data = await response.json();

      // Store user data in localStorage
      localStorage.setItem(
        "mantisUser",
        JSON.stringify({
          // _id: data.user._id,
          username: username,
          email: email,
          token: data.token || "",
          influxToken: data.influxToken,
          bucket: data.bucket,
        })
      );

      // alert('Registration successful!');

      if (onRegisterSuccess) {
        onRegisterSuccess({
          // _id: data.user._id,
          username: username,
          token: data.token || "",
          influxToken: data.influxToken,
          bucket: data.bucket,
        });
      }

      navigate("/dashboard");
    } catch (error) {
      console.error("Registration error:", error);
      alert("Error during registration");
    }
  };

  return (
    <div className="login-container flex justify-center items-center w-full">
      <div className="login-form w-full max-w-sm p-6 rounded-xl shadow-2xl bg-[rgba(25,59,45,0.5)] backdrop-blur-md">
        <h1
          className="text-2xl font-semibold text-white mb-4"
          style={{ fontFamily: '"Faustina", sans-serif' }}
        >
          Register
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 rounded-md focus:outline-none border focus:ring-2 focus:ring-[#A3CD9A]"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded-md focus:outline-none border focus:ring-2 focus:ring-[#A3CD9A]"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded-md focus:outline-none border focus:ring-2 focus:ring-[#A3CD9A]"
          />

          <button
            type="submit"
            className="login-button w-full py-2 mt-2 rounded-md bg-[#A3CD9A] text-[#193B2D] font-semibold hover:bg-[#fdf6bf] transition-colors duration-200"
            style={{ fontFamily: '"Faustina", sans-serif' }}
          >
            Register
          </button>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-sm text-white mt-2 hover:underline"
          >
            Already have an account? <span className="font-bold">Sign In</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
