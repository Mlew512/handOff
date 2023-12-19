import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { api } from "../utilities";
import { useNavigate } from "react-router-dom";

const EditPatient = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [dateOfBirth, setDateOfBirth] = useState();
  const [sex, setSex] = useState();
  const [allergies, setAllergies] = useState();
  const [pmh, setPmh] = useState();
  const [medicalId, setMedicalId] = useState();
  const [patient, setPatient] = useState({});
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  useEffect(() => {
    const getPatient = async () => {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `token ${token}`,
      };

      try {
        setLoading(true);
        const response = await api.get(`v1/patients/${id}/`, { headers });
        setPatient(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    getPatient();
  }, [id]);

  const modifyPatient = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `token ${token}`,
    };

    const data = {
      first_name: firstName,
      last_name: lastName,
      sex:sex,
      date_of_birth: dateOfBirth,
      allergies: allergies,
      past_medical_history: pmh,
      medical_id: medicalId,
    };

    try {
      const response = await api.put(`v1/patients/${id}/`, data, { headers });

      if (response.status === 204) {
        alert("Patient updated");
        navigate(`/patient/${id}/`);
      }
    } catch (err) {
      alert("Could not update patient");
      console.error(err);
    }
  };

  const DeleteThem = async () => {
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `token ${token}`,
    };

    let response = await api
      .delete(`v1/patients/${id}/`, { headers })
      .catch((err) => {
        alert("could not delete this patient");
        console.error(err);
      });
    if (response.status === 204) {
      alert("patient deleted");
      navigate(`/patients/`);
    }
  };
  const showDeleteConfirmationDialog = () => {
    setShowDeleteConfirmation(true);
  };

  return (
    <Row id="patientsPage" className="justify-content-center">
      <Card style={{ width: "30rem", margin: "20px" }}>
        <Card.Body>
          <Card.Title>Edit Patient</Card.Title>
          <form onSubmit={(e) => modifyPatient(e)}>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
                First Name:
              </label>
              <input
                type="text"
                id="firstName"
                className="form-control"
                placeholder={patient.first_name}
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
                id="lastName"
                className="form-control"
                placeholder={patient.last_name}
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
                id="dateOfBirth"
                className="form-control"
                placeholder={patient.date_of_birth}
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="sex" className="form-label">
                sex:
              </label>
              <input
                type="text"
                id="allergies"
                className="form-control"
                placeholder={patient.sex}
                value={sex}
                onChange={(e) => setSex(e.target.value)}
              />
              </div>
            <div className="mb-3">
              <label htmlFor="allergies" className="form-label">
                Allergies:
              </label>
              <input
                type="text"
                id="allergies"
                className="form-control"
                placeholder={patient.allergies}
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
                id="pmh"
                className="form-control"
                placeholder={patient.past_medical_history}
                value={pmh}
                onChange={(e) => setPmh(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="medicalId" className="form-label">
                Medical Id:
              </label>
              <input
                type="text"
                id="medicalId"
                className="form-control"
                placeholder={patient.medical_id}
                value={medicalId}
                onChange={(e) => setMedicalId(e.target.value)}
              />
            </div>
            <Button className="btn btn-success m-2" type="submit">Save changes</Button>
            <br/>
            <Button className="btn btn-secondary m-2" onClick={(e)=>navigate(`/patient/${id}/`)}>Cancel</Button>
            
            

          </form>
        </Card.Body>
      </Card>
      <Card style={{ width: "18rem", margin: "20px" }}>
        <Card.Body>
          <Card.Title>Delete patient</Card.Title>
          {!showDeleteConfirmation && (
            <Button className="btn-danger m-2" onClick={showDeleteConfirmationDialog}>
             Delete patient
            </Button>
          )}
          {showDeleteConfirmation && (
            <div>
              <p>Are you sure you want to delete this patient?</p>
              <Button className="btn btn-danger m-2" onClick={DeleteThem}>
                Delete Patient
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>
    </Row>
  );
};

export default EditPatient;
