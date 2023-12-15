import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../utilities";

function EditECard({
  id,
  admitDate,
  diagnosis,
  isAdmitted
}) {
  const navigate = useNavigate();
  const [newAdmitDate, setNewAdmitDate] = useState(admitDate);
  const [newDiagnosis, setNewDiagnosis] = useState(diagnosis);
  const [newIsAdmitted, setNewIsAdmitted] = useState(isAdmitted);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `token ${token}`,
    };
    const data = { 
      admitted_date: newAdmitDate,
      admitted: newIsAdmitted,
      diagnosis: newDiagnosis,
  };

    console.log(data);

    try {
      console.log(headers);
      const response = await api.put(`v1/encounters/${id}/`, data, {
        headers,
      });

      if (response.status === 204) {
        window.location.reload();
      }
    } catch (err) {
      alert("Could not edit encounter");
      console.error(err);
    }
  };

  return (
    <Card style={{ width: "80rem", margin: "1rem" }}>
      <Card.Body>
        <Card.Title>
          Edit Assessment
        </Card.Title>
        <Card.Text>
          <h3>Date:</h3>
          <input
            type="datetime-local"
            defaultValue={admitDate}
            onChange={(e) => setNewAdmitDate(e.target.value)}
          ></input>
          <h3>Diagnosis:</h3>
          <input
            type="text"
            defaultValue={diagnosis}
            onChange={(e) => setNewDiagnosis(e.target.value)}
          ></input>
          admitted:
        <input
          type="checkbox"
          checked={isAdmitted}
          onChange={(e) => setNewIsAdmitted(e.target.checked)}
        />
        </Card.Text>
        <Button variant="primary" onClick={handleUpdate}>
          Save encounter
        </Button>
      </Card.Body>
    </Card>
  );
}

export default EditECard;
