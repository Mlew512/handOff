import { api } from "../utilities";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Form, Button, Container, Row, Col } from "react-bootstrap";


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
    let user_id = response.data.user_id
    localStorage.setItem("token", token);
    localStorage.setItem('user_id', user_id);
    api.defaults.headers.common["Authorization"] = `Token ${token}`;
    setUser(user);
    navigate("/");
    window.location.reload();
    };

    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Card style={{ width: "20rem" }}>
          <Card.Body>
            <h1 className="mb-4">Log In</h1>
            <Form onSubmit={logIn}>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="inputEmail">Email</Form.Label>
                <Form.Control
                  type="email"
                  id="inputEmail"
                  placeholder="Email"
                  value={username}
                  onChange={(e) => setUser(e.target.value)}
                />
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
              </Form.Group>
              <Button type="submit" variant="primary" className="w-100">
                Login
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    );
  };
  
  export default Login;