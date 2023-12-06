import { api } from "../utilities";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [username, setUser] = useState("");
    const [password, setPassword] = useState("");
    const logIn = async (e) => {
    e.preventDefault();
    let response = await api.post("v1/users/login/", {
        email: username,
        password: password,
    });
    console.log(response);
    let token = response.data.token;
    let user = response.data.user;
    localStorage.setItem("token", token);
    api.defaults.headers.common["Authorization"] = `Token ${token}`;
    setUser(user);
    navigate("/home");
    };

return (
    <>
      <h1>Log In</h1>
      <form onSubmit={logIn}>
        <div>
        <label htmlFor="inputEmail" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="inputEmail"
            className="form-control"
            aria-describedby="EmailHelpBlock"
            placeholder="Email"
            value={username}
            onChange={(e) => setUser(e.target.value)}
          />
          <div id="usernameHelpBlock" className="form-text">
          </div>
          <label htmlFor="inputPassword5" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="inputPassword5"
            className="form-control"
            placeholder="PassWord"
            aria-describedby="passwordHelpBlock"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div id="passwordHelpBlock" className="form-text">
          </div>
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
