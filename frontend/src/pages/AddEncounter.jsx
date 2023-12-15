import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
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

    console.log(data);
    
    try {
        console.log(headers)
        const response = await api.post(
            "v1/encounters/", data ,
            { headers }
            );
            
            if (response.status === 201) {
                alert("Encounter created")
                navigate(`/patient/${id}/`)
            }
        } catch (err) {
            alert("Could not create assessment");
            console.error(err);
        }
    };
    
    return (
        <Row style={{ padding: "0 10vmin" }}>
      <form onSubmit={(e) => createEncounter(e)}>
        <h2>Create an encounter</h2>
        <p>patient ID: {id}</p>
        <input
          type="datetime-local"
          placeholder="Admit date"
          value={admitDate}
          onChange={(e) => setAdmitDate(e.target.value)}
        />
        admitted:
        <input
          type="checkbox"
          checked={isAdmitted}
          onChange={(e) => setIsAdmitted(e.target.checked)}
        />
        <input
          type="text"
          placeholder="Diagnosis"
          onChange={(e) => setDiagnosis(e.target.value)}
        />
        <input type="submit" value="Create" />
      </form> 
    </Row>
  );
};

export default AddEncounter;
