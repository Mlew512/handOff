import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cards from "../components/Card";
import { api } from "../utilities";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

const Assessments= () => {
  const [patient, setPatient] = useState({});
  const [loading, setLoading] = useState(true);
  const [encounter, setEncounter] = useState({});
  const[encounterDate, setEncounterDate] = useState("")
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const getAssessments = async () => {
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `token ${token}`,
    };
    // console.log(headers)
    try {
      setLoading(true);
      const response = await api.get(`v1/encounters/${id}/`, {
        headers,
      });
      console.log(response.data);
      setEncounter(response.data);
      const inputDate = new Date(response.data.admitted_date);
      const formatted_data= inputDate.toISOString().split('T')[0];
      setEncounterDate(formatted_data)
      
    } catch (error) {
        setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEncounter();
  }, [id]);

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <>
          <div>
            <h2>Encounter</h2>
            <Card style={{ width: "18rem" }}>
              <Card.Title>{encounterDate}</Card.Title>
              <Card.Body>
                {encounter.patient_id.first_name} {encounter.patient_id.last_name}
                <br/>
                {encounter.patient_id.date_of_birth}
                <br/>
                {encounter.diagnosis}
              </Card.Body>
            </Card>
          </div>
        </>
      )}
    </>
  );
};

export default Assessments;
