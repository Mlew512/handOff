import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import { api } from "../utilities";
import { useNavigate } from "react-router-dom";
import Col from "react-bootstrap/esm/Col";

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
      <Col md={6} className="mx-auto">
        <form onSubmit={(e) => createPatient(e)}>
          <h2>Create a patient</h2>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
              First Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">
              Last Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="dateOfBirth" className="form-label">
              Date of Birth:
            </label>
            <input
              type="date"
              className="form-control"
              id="dateOfBirth"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="allergies" className="form-label">
              Allergies:
            </label>
            <input
              type="text"
              className="form-control"
              id="allergies"
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="pmh" className="form-label">
              Past Medical History:
            </label>
            <input
              type="text"
              className="form-control"
              id="pmh"
              value={pmh}
              onChange={(e) => setPmh(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="medicalId" className="form-label">
              Medical Id:
            </label>
            <input
              type="number"
              className="form-control"
              id="medicalId"
              value={medicalId}
              onChange={(e) => setMedicalId(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input type="submit" className="btn btn-primary" value="Create" />
          </div>
        </form>
      </Col>
    </Row>
  );
};

export default AddPatient;