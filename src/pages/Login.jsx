import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  const getPasswordStrength = () => {
    if (!password) return "";

    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) return "Weak";
    if (score <= 4) return "Medium";
    return "Strong";
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username.trim()) {
      setError("Username is required");
      return;
    }

    if (!password) {
      setError("Password is required");
      return;
    }

    if (username === "admin" && password === "Admin@123") {
      const payload = {
        username,
        loginTime: Date.now(),
      };

      // Simulated JWT token
      const token = btoa(JSON.stringify(payload));

      if (remember) {
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("username");
      } else {
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("username", username);
        localStorage.removeItem("token");
        localStorage.removeItem("username");
      }

      navigate("/dashboard");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleLogin}>
        <h1>Welcome Back!</h1>
        <p>Login to your account</p>

        <label>Username</label>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setError("");
          }}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
        />

        {password && (
          <p className="strength">
            Password Strength: <strong>{getPasswordStrength()}</strong>
          </p>
        )}

        <label className="remember">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />
          Remember Me
        </label>

        {error && <p className="error">{error}</p>}

        <button type="submit">Login</button>

        <p className="demo">
          Demo Username: admin<br />
          Demo Password: Admin@123
        </p>
      </form>
    </div>
  );
}

export default Login;
