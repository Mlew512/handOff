import Cards from "../components/Card";
import axios from "axios";
import { useState, useEffect } from "react";
import { api } from "../utilities";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
const Patients = () => {
  const [patients, setPatients] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getPatients = async () => {
      const token = localStorage.getItem("token");

      const headers = {
        Authorization: `token ${token}`,
      };
      // console.log(headers)
      try {
        setLoading(true);
        const response = await api.get(`v1/patients`, { headers });
        // console.log(response.data)
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
          {patients.map((patient, idx) => (
            <div key={idx}>
              <Cards
                id={patient.id}
                firstName={patient.first_name}
                lastName={patient.last_name}
                age={patient.date_of_birth}
                pmh={patient.past_medical_history}
                allergies={patient.allergies}
              />
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default Patients;
