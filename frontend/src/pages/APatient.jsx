import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import APatientCard from "../components/APatientCard.jsx";
import { api } from "../utilities";
import EncounterCards from "../components/EncounterCard.jsx";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

const APatient = () => {
  const [patient, setPatient] = useState({});
  const [loading, setLoading] = useState(true);
  const [encounter, setEncounter] = useState([]);
  const [error, setError] = useState(null);
  const [lastAssessment, setLastAssessment] = useState(0);
  const [lastId, setLastId] = useState();
  const [assessments, setAssessments] = useState([]);
  const [lastAssess, setLastAssess] = useState(0);

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
      setLastId(response.data[response.data.length-1].id)
    }  finally {
      setLoading(false);
    }
  };

  const getAssessments = async () => {
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `token ${token}`,
    };

    try {
      setLoading(true);
      const response = await api.get(
        `v1/assessments/encounter/${lastId}/`,
        {
          headers,
        }
      );
      setAssessments(response.data);
      setLastAssess(response.data.length - 1);
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

  useEffect(() => {
    getAssessments();
  }, [encounter]);

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <>
          <Row>
            <Col md={6}>
              <APatientCard
                id={patient?.id}
                firstName={patient?.first_name}
                lastName={patient?.last_name}
                sex={patient?.sex}
                age={patient?.date_of_birth}
                pmh={patient?.past_medical_history}
                allergies={patient?.allergies}
              />
            </Col>
            <Col md={6}>
            {assessments && assessments.length > 0 && assessments[lastAssess] && (
                <div className="d-flex flex-column mt-3">
                  <>
                    <br />
                    {loading && <p>Gathering Assessments</p>}
                    {error && <p>Error: {error}</p>}
                    {!loading && !error && (
                      <>
                        <div>
                          <Card style={{ width: "50rem" }}>
                            <Card.Title>Most Recent Assessment</Card.Title>
                            <Card.Body>
                              <h3>Neuro:</h3>
                              {assessments && assessments[lastAssess]?.neuro}
                              <br />
                              <h3>Cardiac:</h3>
                              {assessments && assessments[lastAssess]?.cardio}
                              <br />
                              <h3>Respiratory:</h3>
                              {assessments &&
                                assessments[lastAssess]?.respiratory}
                              <br />
                              <h3>GI:</h3>
                              {assessments &&
                                assessments[lastAssess]?.gastrointestinal}
                              <br />
                              <h3>GU:</h3>
                              {assessments &&
                                assessments[lastAssess]?.genitourinary}
                            </Card.Body>
                          </Card>
                        </div>
                      </>
                    )}
                  </>
                </div>
              )}
            </Col>

            <Col md={3}>
              <div className="d-flex flex-column mt-3">
                <h2>Most Recent Encounter</h2>
                {encounter[lastAssessment] ? (
                  <EncounterCards
                    admitted_date={encounter[lastAssessment]?.admitted_date}
                    diagnosis={encounter[lastAssessment]?.diagnosis}
                    id={encounter[lastAssessment]?.id}
                  />
                ) : (
                  <h2>No encounter</h2>
                )}
                <h2 className="mt-3">All Encounters</h2>
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
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default APatient;
