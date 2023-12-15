import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../utilities";

function EditCard({
  firstName,
  id,
  lastName,
  time,
  dob,
  provider,
  pFirstName,
  pLastName,
  age,
  neuro,
  cardio,
  respiratory,
  gi,
  gu,
}) {
  const navigate = useNavigate();
  const [assessmentTime, setAssessmentTime] = useState(time);
  const [newNeuro, setNewNeuro] = useState(neuro);
  const [newCardio, setNewCardio] = useState(cardio);
  const [newRespiratory, setNewRespiratory] = useState(respiratory);
  const [newGi, setNewGi] = useState(gi);
  const [newGu, setNewGu] = useState(gu);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `token ${token}`,
    };
    const data = {
      assessment_time: assessmentTime,
      neuro: newNeuro,
      cardio: newCardio,
      respiratory: newRespiratory,
      gastrointestinal: newGi,
      genitourinary: newGu,
    };

    console.log(data);

    try {
      console.log(headers);
      const response = await api.put(`v1/assessments/${id}/`, data, {
        headers,
      });

      if (response.status === 204) {
        window.location.reload();
      }
    } catch (err) {
      alert("Could not create assessment");
      console.error(err);
    }
  };

  return (
    <Card style={{ width: "80rem", margin: "1rem" }}>
      <Card.Body>
        <Card.Title>
          {firstName} {lastName}
        </Card.Title>
        <Card.Text>
          <h3>Date:</h3>
          <input
            type="datetime-local"
            defaultValue={assessmentTime}
            onChange={(e) => setAssessmentTime(e.target.value)}
          ></input>
          <h3>Provider:</h3>
          {provider} {pFirstName} {pLastName}
          <br />
          <h3>Patient:</h3>
          {firstName} {lastName}
          <br />
          <h3>Age:</h3>
          {dob}
          <br />
          <h3>Neuro:</h3>
          <input
            type="text"
            defaultValue={neuro}
            onChange={(e) => setNewNeuro(e.target.value)}
          ></input>
          <br />
          <h3>Cardio:</h3>
          <input
            type="text"
            defaultValue={cardio}
            onChange={(e) => setNewCardio(e.target.value)}
          ></input>
          <br />
          <h3>Respiratory:</h3>
          <input
            type="text"
            defaultValue={respiratory}
            onChange={(e) => setNewRespiratory(e.target.value)}
          ></input>
          <br />
          <h3>GI:</h3>
          <input
            type="text"
            defaultValue={gi}
            onChange={(e) => setNewGi(e.target.value)}
          ></input>
          <br />
          <h3>GU:</h3>
          <input
            type="text"
            defaultValue={gu}
            onChange={(e) => setNewGu(e.target.value)}
          ></input>
        </Card.Text>
        <Button variant="primary" onClick={handleUpdate}>
          Save Assessment
        </Button>
      </Card.Body>
    </Card>
  );
}

export default EditCard;
