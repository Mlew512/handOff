import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cards from "../components/Card";
import { api } from "../utilities";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import AllAssessments from "../components/GetLastAssessment.jsx";
import LastAssessments from "../components/GetLastAssessment.jsx";

const APatient = () => {
  const [patient, setPatient] = useState({});
  const [loading, setLoading] = useState(true);
  const [encounter, setEncounter] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [lastAssessment, setLastAssesment]= useState(0);

  const { id } = useParams();

  const getPatient = async () => {
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `token ${token}`,
    };
    // console.log(headers)
    try {
      setLoading(true);
      const response = await api.get(`v1/patients/${id}/`, { headers });
      // console.log(response.data)
      setPatient(response.data);
    } catch (error) {
      setError(error.message);
    }
  };
  const getEncounter = async () => {
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `token ${token}`,
    };
    // console.log(headers)
    try {
      setLoading(true);
      const response = await api.get(`v1/encounters/patient/${id}/`, {
        headers,
      });
    //   console.log(response.data);
      setEncounter(response.data);
      setLastAssesment(response.data.length-1)
      console.log(response.data.length-1)
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPatient();
  }, [id]);
  useEffect(() => {
    getEncounter();
  }, [patient]);

  // Function to summarize assessment data for the last 12 hours

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <>
          <Cards
            id={patient.id}
            firstName={patient.first_name}
            lastName={patient.last_name}
            age={patient.date_of_birth}
            pmh={patient.past_medical_history}
            allergies={patient.allergies}
          />
          <div>
            <LastAssessments id={id}/>
          </div>
          <div> 
            <h2>Most Recent Encounter</h2>
            {encounter[0] ? <Card style={{ width: "18rem", margin:"2rem"}}>
              <Card.Title>{encounter[lastAssessment].admitted_date}</Card.Title>
              <Card.Body>
                {encounter[lastAssessment].diagnosis}
                <Button
                  variant="primary"
                  onClick={() => navigate(`../encounters/${encounter[lastAssessment].id}`)}
                >
                  Go to Encounter
                </Button>
              </Card.Body>
            </Card> : <h2>No encounter</h2>}
          </div>
        </>
      )}
    </>
  );
};

export default APatient;
