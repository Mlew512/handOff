import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
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

    console.log(data);
    
    try {
        console.log(headers)
        const response = await api.post(
            "v1/assessments/", data ,
            { headers }
            );
            
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
    }, []);
    
    return (
        <Row style={{ padding: "0 10vmin" }}>
      <form onSubmit={(e) => createAssessment(e)}>
        <h2>Create an assessment</h2>
        <p>Encounter ID: {id}</p>
        <p>patient ID: {pt_id}</p>
        <p>Provider ID: {userId}</p>
        <input
          type="datetime-local"
          placeholder="Assessment Time"
          value={assessmentTime}
          onChange={(e) => setAssessmentTime(e.target.value)}
        />
        <input
          type="text"
          placeholder="Neuro"
          onChange={(e) => setNeuro(e.target.value)}
        />
        <input
          type="text"
          placeholder="Cardio"
          onChange={(e) => setCardio(e.target.value)}
        />
        <input
          type="text"
          placeholder="Respiratory"
          onChange={(e) => setRespiratory(e.target.value)}
        />
        <input
          type="text"
          placeholder="Gastrointestinal"
          onChange={(e) => setGastrointestinal(e.target.value)}
        />
        <input
          type="text"
          placeholder="Genitourinary"
          onChange={(e) => setGenitourinary(e.target.value)}
        />
        <input type="submit" value="Create" />
      </form>
    </Row>
  );
};

export default AddAssessment;
