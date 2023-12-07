// RegisterPage.jsx
import { useState } from "react";
import { api } from "../utilities";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");

  const signUp = async (e) => {
    e.preventDefault();
    let response = await api.post("v1/users/signup/", {
      email: username,
      password: password,
    });
    let user = response.data.user;
    let token = response.data.token;
    // Store the token securely (e.g., in localStorage or HttpOnly cookies)
    localStorage.setItem("token", token);
    localStorage.setItem('user', user)
    api.defaults.headers.common["Authorization"] = `Token ${token}`;
    // set the user using with useContext to allow all other pages that need user information
    // setUser(user);
    navigate("/home");
  };

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={signUp}>
        <div>
        <label htmlFor="inputEmail" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="inputEmail"
            className="form-control"
            aria-describedby="passwordHelpBlock"
            placeholder="Email"
            value={username}
            onChange={(e) => setUser(e.target.value)}
          />
          <div id="usernameHelpBlock" className="form-text">
            Email must be a valid address example: johnsmith@mail.com
          </div>
          <label htmlFor="inputPassword5" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="inputPassword5"
            className="form-control"
            aria-describedby="passwordHelpBlock"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div id="passwordHelpBlock" className="form-text">
            Your password must be 8-20 characters long, contain letters and
            numbers, and must not contain spaces, special characters, or emoji.
          </div>
        </div>
        <button type="submit">Sign up</button>
      </form>
    </>
  );
};

export default Register;
