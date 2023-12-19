import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { api } from "../utilities";

const AddAssessment = () => {
  const { id } = useParams();
  const { pt_id } = useParams();

  const [userId, setUserId] = useState(null);
  const [assessmentTime, setAssessmentTime] = useState("");
  const [neuro, setNeuro] = useState("");
  const [cardio, setCardio] = useState("");
  const [respiratory, setRespiratory] = useState("");
  const [gastrointestinal, setGastrointestinal] = useState("");
  const [genitourinary, setGenitourinary] = useState("");
  const [assessments, setAssessments] = useState([]);

  const createAssessment = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `token ${token}`,
    };

    const data = {
      encounter: id,
      patient: pt_id,
      provider: userId,
      assessment_time: assessmentTime,
      neuro: neuro,
      cardio: cardio,
      respiratory: respiratory,
      gastrointestinal: gastrointestinal,
      genitourinary: genitourinary,
    };

    try {
      const response = await api.post("v1/assessments/", data, { headers });

      if (response.status === 201) {
        window.location.reload();
      }
    } catch (err) {
      alert("Could not create assessment");
      console.error(err);
    }
  };

  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");

    if (storedUserId) {
      const userIdValue = parseInt(storedUserId, 10);
      setUserId(userIdValue);
    }

    // Fetch existing assessments for display
    const fetchAssessments = async () => {
      try {
        const response = await api.get(`v1/assessments/encounter/${id}/`);
        setAssessments(response.data);
      } catch (error) {
        console.error("Error fetching assessments", error);
      }
    };

    fetchAssessments();
  }, [id]);

  return (
    <div>
      <h2>Document new Assessment</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Assessment Time</th>
            <th>Neuro</th>
            <th>Cardio</th>
            <th>Respiratory</th>
            <th>Gastrointestinal</th>
            <th>Genitourinary</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {assessments.map((assessment) => (
            <tr key={assessment.id}>
              <td>{assessment.assessment_time}</td>
              <td>{assessment.neuro}</td>
              <td>{assessment.cardio}</td>
              <td>{assessment.respiratory}</td>
              <td>{assessment.gastrointestinal}</td>
              <td>{assessment.genitourinary}</td>
              <td>
                <Button variant="danger">Delete</Button>
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <input
                type="datetime-local"
                placeholder="Assessment Time"
                value={assessmentTime}
                onChange={(e) => setAssessmentTime(e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Neuro"
                onChange={(e) => setNeuro(e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Cardio"
                onChange={(e) => setCardio(e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Respiratory"
                onChange={(e) => setRespiratory(e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Gastrointestinal"
                onChange={(e) => setGastrointestinal(e.target.value)}
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Genitourinary"
                onChange={(e) => setGenitourinary(e.target.value)}
              />
            </td>
            <td>
              <Button type="button" onClick={(e) => createAssessment(e)}>
                Create
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default AddAssessment;
