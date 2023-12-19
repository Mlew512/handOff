// RegisterPage.jsx
import { useState } from "react";
import { api } from "../utilities";
import { useNavigate } from "react-router-dom";
import { Card, Form, Button, Container } from "react-bootstrap";

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
    localStorage.setItem("token", token);
    localStorage.setItem('user', user)
    api.defaults.headers.common["Authorization"] = `Token ${token}`;
    navigate("/");
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: "20rem" }}>
        <Card.Body>
          <h1 className="mb-4">Register</h1>
          <Form onSubmit={signUp}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="inputEmail">Email</Form.Label>
              <Form.Control
                type="email"
                id="inputEmail"
                placeholder="Email"
                value={username}
                onChange={(e) => setUser(e.target.value)}
              />
              <Form.Text id="usernameHelpBlock" className="text-muted">
                Email must be a valid address, for example: johnsmith@mail.com
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="inputPassword5">Password</Form.Label>
              <Form.Control
                type="password"
                id="inputPassword5"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Form.Text id="passwordHelpBlock" className="text-muted">
                Your password must be 8-20 characters long, contain letters and
                numbers, and must not contain spaces, special characters, or emoji.
              </Form.Text>
            </Form.Group>
            <Button type="submit" variant="primary" className="w-100">
              Sign up
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Register;
