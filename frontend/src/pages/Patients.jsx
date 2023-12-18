import React, { useState, useEffect } from "react";
import { api } from "../utilities";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import Cards from "../components/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getPatients = async () => {
      const token = localStorage.getItem("token");

      const headers = {
        Authorization: `token ${token}`,
      };

      try {
        setLoading(true);
        const response = await api.get(`v1/patients`, { headers });
        setPatients(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getPatients();
  }, []);

  return (
    <>
      <Button onClick={() => navigate(`/patients/add`)}>Add a Patient</Button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <>
          <Row className="mb-4 d-flex align-items-center justify-content-center">
            {patients.map((patient) => (
              <Col key={patient.id} className="mb-4">
                <Cards
                id={patient.id}
                firstName={patient.first_name}
                lastName={patient.last_name}
                age={patient.date_of_birth}
                pmh={patient.past_medical_history}
                allergies={patient.allergies}
              />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default Patients;
