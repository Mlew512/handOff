import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import { api } from "../utilities";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";

const EditPatient = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Define state for each input
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [dateOfBirth, setDateOfBirth] = useState();
  const [allergies, setAllergies] = useState();
  const [pmh, setPmh] = useState();
  const [medicalId, setMedicalId] = useState();

  const [patient, setPatient] = useState({});

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
      alert("patient deleted")
      navigate(`/patients/`)
    }
  };

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <>
          <Row style={{ padding: "0 10vmin" }}>
            <form onSubmit={(e) => modifyPatient(e)}>
              <h2>Edit Patient</h2>
              First Name:
              <input
                type="text"
                placeholder={patient.first_name}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              Last Name:
              <input
                type="text"
                placeholder={patient.last_name}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              Date of Birth:
              <input
                type="date"
                placeholder={patient.date_of_birth}
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
              Allergies:
              <input
                type="text"
                placeholder={patient.allergies}
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
              />
              Past Medical History:
              <input
                type="text"
                placeholder={patient.past_medical_history}
                value={pmh}
                onChange={(e) => setPmh(e.target.value)}
              />
              Medical Id:
              <input
                type="text" // Assuming medicalId is a string
                placeholder={patient.medical_id}
                value={medicalId}
                onChange={(e) => setMedicalId(e.target.value)}
              />
              <Button type="submit" >Save</Button>
            </form>
          </Row>
            <h2>Delete patient</h2>
            <Button class="danger" onClick={DeleteThem} >Delete Patient</Button>
        </>
      )}
    </>
  );
};

export default EditPatient;
