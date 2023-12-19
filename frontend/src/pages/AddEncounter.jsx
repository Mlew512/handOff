import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { api } from "../utilities";
import { useNavigate } from "react-router-dom";

const AddEncounter = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [admitDate, setAdmitDate] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [isAdmitted, setIsAdmitted] = useState(true);

  const createEncounter = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `token ${token}`,
    };

    const data = {
      patient_id: id,
      admitted_date: admitDate,
      admitted: isAdmitted,
      diagnosis: diagnosis,
    };

    try {
      const response = await api.post("v1/encounters/", data, { headers });

      if (response.status === 201) {
        alert("Encounter created");
        navigate(`/patient/${id}/`);
      }
    } catch (err) {
      alert("Could not create assessment");
      console.error(err);
    }
  };

  return (
    <Card style={{ width: "18rem", margin: "auto", marginTop: "20px" }}>
      <Card.Body>
        <Card.Title>Create an Encounter</Card.Title>
        <Card.Text>patient ID: {id}</Card.Text>
        <Form onSubmit={(e) => createEncounter(e)}>
          <Form.Group controlId="admitDate">
            <Form.Label>Admit Date</Form.Label>
            <Form.Control
              type="datetime-local"
              value={admitDate}
              onChange={(e) => setAdmitDate(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="isAdmitted">
            <Form.Check
              type="checkbox"
              label="Admitted"
              checked={isAdmitted}
              onChange={(e) => setIsAdmitted(e.target.checked)}
            />
          </Form.Group>

          <Form.Group controlId="diagnosis">
            <Form.Label>Diagnosis</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter diagnosis"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Create
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AddEncounter;
