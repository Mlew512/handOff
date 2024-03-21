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
  const [sex, setSex] = useState("");
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
      last_name: lastName,
      sex: sex,
      date_of_birth: dateOfBirth,
      allergies: allergies,
      past_medical_history: pmh,
      medical_id: medicalId,
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
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    if (month < 10) {
      month = `0${month}`; // Add leading zero if month is less than 10
    }
    if (day < 10) {
      day = `0${day}`; // Add leading zero if day is less than 10
    }

    return `${year}-${month}-${day}`;
  };
  return (
    <Row id="patientsPage" style={{ padding: "0 10vmin" }}>
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
            <label htmlFor="sex" className="form-label">
              Sex:
            </label>
            <select
              className="form-select"
              id="sex"
              value={sex}
              onChange={(e) => setSex(e.target.value)}
            >
              <option value="">Select sex</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="dateOfBirth" className="form-label">
              Date of Birth:
            </label>
            <input
              type="date"
              className="form-control"
              id="dateOfBirth"
              max={getCurrentDate()} // Set the max attribute to the current date
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
