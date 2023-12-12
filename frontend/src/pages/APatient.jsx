import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cards from "../components/Card";
import { api } from "../utilities";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

const APatient = () => {
  const [patient, setPatient] = useState({});
  const [loading, setLoading] = useState(true);
  const [encounter, setEncounter] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
  const summarizeAssessmentData = () => {
    //get assessment data
    // filterfor the last 12 hours
    //FEED INTO GPT
    // Return the summarized result
  };

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
            {/* make a section for each body system */}
            <h2>Assessment Data Summary (Last 12 hours)</h2>
            <p>{summarizeAssessmentData()}</p>
          </div>
          <div>
            <h2>Most Recent Encounter</h2>
            {encounter[0] ? <Card style={{ width: "18rem" }}>
              <Card.Title>{encounter[0].admitted_date}</Card.Title>
              <Card.Body>
                {encounter[0].diagnosis}
                <Button
                  variant="primary"
                  onClick={() => navigate(`../encounters/${encounter[0].id}`)}
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
