import Cards from "../components/Card";
import axios from "axios";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { api } from "../utilities";

const Patients = () => {
    const [patients, setPatients] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  useEffect(() => {
    const getPatients = async () => {
        const token = localStorage.getItem('token'); 

        const headers = {
            'Authorization': `token ${token}`,
        };
        // console.log(headers)
        try {
            setLoading(true);
            const response = await api.get(`v1/patients`, { headers },)
            // console.log(response.data)
            setPatients(response.data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    getPatients();
  }, []);


return (
    <>
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
