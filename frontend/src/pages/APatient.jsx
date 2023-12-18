import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import APatientCard from "../components/APatientCard.jsx";
import { api } from "../utilities";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import LastAssessments from "../components/GetLastAssessment.jsx";
import EncounterCards from "../components/EncounterCard.jsx";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const APatient = () => {
  const [patient, setPatient] = useState({});
  const [loading, setLoading] = useState(true);
  const [encounter, setEncounter] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [lastAssessment, setLastAssessment] = useState(0);

  const { id } = useParams();

  const getPatient = async () => {
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `token ${token}`,
    };

    try {
      setLoading(true);
      const response = await api.get(`v1/patients/${id}/`, { headers });
      setPatient(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getEncounter = async () => {
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `token ${token}`,
    };

    try {
      setLoading(true);
      const response = await api.get(`v1/encounters/patient/${id}/`, {
        headers,
      });
      setEncounter(response.data);
      setLastAssessment(response.data.length - 1);
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

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <>
          <Row>
            <Col md={6}>
              <APatientCard
                id={patient.id}
                firstName={patient.first_name}
                lastName={patient.last_name}
                age={patient.date_of_birth}
                pmh={patient.past_medical_history}
                allergies={patient.allergies}
              />
            </Col>
            <Col md={3}>
              <div className="d-flex flex-column">
                <div className="mt-3">
                  <LastAssessments id={id} />
                </div>
              </div>
            </Col>
            <Col md={3}>
              <div className="d-flex flex-column">
                <div className="mt-3">
                  <h2>Most Recent Encounter</h2>
                  {encounter[lastAssessment] ? (
                    <EncounterCards
                      admitted_date={encounter[lastAssessment].admitted_date}
                      diagnosis={encounter[lastAssessment].diagnosis}
                      id={encounter[lastAssessment].id}
                    />
                  ) : (
                    <h2>No encounter</h2>
                  )}
                </div>
                <div className="mt-3">
                  <h2>All Encounters</h2>
                  <Button
                    onClick={() => navigate(`../patient/${id}/addencounter`)}
                  >
                    Add Encounter
                  </Button>
                  {encounter.map((encount, idx) => (
                    <div key={idx}>
                      {lastAssessment > 1 ? (
                        <EncounterCards
                          admitted_date={encount.admitted_date}
                          diagnosis={encount.diagnosis}
                          id={encount.id}
                        />
                      ) : (
                        <h2>No more</h2>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default APatient;
