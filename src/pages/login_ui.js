import React from "react";
import { useState } from "react";
import BackgroundLogin from "../components/background_login";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault();

    if (email === "admin" && password === "admin") {
      window.location.href = "/homepage/game-stats";
    } else {
      alert("Invalid Username or Password");
    }
  };

  return (
    <>
      <div className="login-container">
        <h1 className="login-title">Sign in</h1>
        <form className="login-form">
          <input
            className="login-input"
            type="text"
            placeholder="Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="login-input"
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input className="submit" type="submit" onClick={handleSignUp} />
        </form>

        <p className="login-link">
          <a href="#">Forgot Password ?</a>
        </p>
        <p className="login-link">
          <a href="/homepage/game-stats">Log As Guest</a>
        </p>
      </div>
      <BackgroundLogin />
    </>
  );
}