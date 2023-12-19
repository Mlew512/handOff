// Register.jsx
import { api } from "../utilities";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Form, Button, Container, Alert } from "react-bootstrap";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error,setError]=useState("")

  const signUp = async (e) => {
    e.preventDefault();
    try {
      let response = await api.post("v1/users/signup/", {
        email: username,
        password: password,
        profession: role,
        first_name: firstName,
        last_name: lastName,
      });
      let user = response.data.user;
      let token = response.data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user)); // Store user as a string
      api.defaults.headers.common["Authorization"] = `Token ${token}`;
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Registration failed:", error);
      setError("Registration failed. Please check your information and try again.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: "20rem" }}>
        <Card.Body>
          <h1 className="mb-4">Register</h1>
          {error && <Alert variant="danger">{error}</Alert>}
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
                numbers, and must not contain spaces, special characters, or
                emoji.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="inputProfession">Profession</Form.Label>
              <Form.Select
                id="inputProfession"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Select Profession</option>
                <option value="Registered Nurse">Registered Nurse</option>
                <option value="Physician">Physician</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="inputFirstName">First Name</Form.Label>
              <Form.Control
                type="text"
                id="inputFirstName"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="inputLastName">Last Name</Form.Label>
              <Form.Control
                type="text"
                id="inputLastName"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
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
