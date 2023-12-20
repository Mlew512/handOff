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
        navigate(`/assessments/${id}`);
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
        <table className="table">
          <tbody>
            <tr>
              <td>
                <h3>Date:</h3>
                {assessmentTime}
                <input
                  className="form-control"
                  type="datetime-local"
                  defaultValue={assessmentTime}
                  onChange={(e) => setAssessmentTime(e.target.value)}
                />
              </td>
              <td>
                <h3>Provider:</h3>
                {provider} {pFirstName} {pLastName}
              </td>
              <td>
                <h3>Patient:</h3>
                {firstName} {lastName}
              </td>
              <td>
                <h3>dob:</h3>
                {age}
              </td>
            </tr>
            <tr>
              <td>
                <h3>Neuro:</h3>
                <input
                  className="form-control"
                  type="text"
                  defaultValue={neuro}
                  onChange={(e) => setNewNeuro(e.target.value)}
                />
              </td>
              <td>
                <h3>Cardio:</h3>
                <input
                  className="form-control"
                  type="text"
                  defaultValue={cardio}
                  onChange={(e) => setNewCardio(e.target.value)}
                />
              </td>
              <td>
                <h3>Respiratory:</h3>
                <input
                  className="form-control"
                  type="text"
                  defaultValue={respiratory}
                  onChange={(e) => setNewRespiratory(e.target.value)}
                />
              </td>
              <td>
                <h3>GI:</h3>
                <input
                  className="form-control"
                  type="text"
                  defaultValue={gi}
                  onChange={(e) => setNewGi(e.target.value)}
                />
              </td>
              <td>
                <h3>GU:</h3>
                <input
                  className="form-control"
                  type="text"
                  defaultValue={gu}
                  onChange={(e) => setNewGu(e.target.value)}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <Button variant="primary" onClick={handleUpdate}>
          Save Assessment
        </Button>
      </Card.Body>
    </Card>
  );
}

export default EditCard;
