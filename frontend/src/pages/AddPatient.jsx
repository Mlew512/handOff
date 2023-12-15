import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import { api } from "../utilities";
import { useNavigate } from "react-router-dom";
import { all } from "axios";

const AddPatient = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [allergies, setAllergies] = useState("");
  const [pmh, setPmh] = useState("");
  const [medicalId, setMedicalId] = useState("");

  const createPatient = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `token ${token}`,
    };

    const data = {
        first_name: firstName,
        last_name : lastName,
        date_of_birth: dateOfBirth,
        allergies :allergies,
        past_medical_history : pmh, 
        medical_id: medicalId
    };

    console.log(data);

    try {
      console.log(headers);
      const response = await api.post("v1/patients/", data, { headers });

      if (response.status === 201) {
        alert("Patient created");
        navigate(`/patients/`);
      }
    } catch (err) {
      alert("Could not create assessment");
      console.error(err);
    }
  };

  return (
    <Row style={{ padding: "0 10vmin" }}>
      <form onSubmit={(e) => createPatient(e)}>
        <h2>Create a patient</h2>
        First Name: 
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        Last Name: 
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
       Date of Birth:
        <input
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
        />
        allergies:
        <input
          type="text"
          value={allergies}
          onChange={(e) => setAllergies(e.target.value)}
        />
        Past Medical History:
        <input
          type="text"
          value={pmh}
          onChange={(e) => setPmh(e.target.value)}
        />
        medical Id:
        <input
          type="Int"
          value={medicalId}
          onChange={(e) => setMedicalId(e.target.value)}
        />
        <input type="submit" value="Create" />
      </form>
    </Row>
  );
};

export default AddPatient;
