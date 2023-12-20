import React, { useState, useEffect } from "react";
import { api } from "../utilities";
import Cards from "../components/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";


const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const getPatients = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Authentication token not found.");
        }

        const headers = {
          Authorization: `token ${token}`,
        };

        const response = await api.get(`v1/patients`, { headers });
        const sortedPatients = response.data.sort((a, b) => a.last_name.localeCompare(b.last_name));
        setPatients(sortedPatients);
      } catch (error) {
        console.error("Error fetching patients:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getPatients();
  }, []);

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <>
          <Row id="patientsPage" xs={1} md={2} lg={3} xl= {4} xxl={5} className="g-4">
            {patients.map((patient) => (
              <Col key={patient.id}>
                <Cards
                  id={patient.id}
                  firstName={patient.first_name}
                  lastName={patient.last_name}
                  sex={patient.sex}
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
