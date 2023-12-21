import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../utilities";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import SumerizeAssessments from "../components/SumerizeAssessments";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Encounters = () => {
  const [loading, setLoading] = useState(true);
  const [encounter, setEncounter] = useState({});
  const [encounterDate, setEncounterDate] = useState("");
  const [encounterTime, setEncounterTime] = useState("");
  const [diagNoun, setDiagNoun] = useState("patient");
  const [error, setError] = useState(null);
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const getEncounter = async () => {
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `token ${token}`,
    };
    try {
      setLoading(true);
      const response = await api.get(`v1/encounters/${id}/`, {
        headers,
      });
      setEncounter(response.data);
      const inputDate = new Date(response.data.admitted_date);
      const formatted_data = inputDate.toISOString().split("T")[0];
      setEncounterDate(formatted_data);
      const encounterType = response.data.diagnosis;
      const formattedType = encounterType.split(" ")[0];
      setDiagNoun(formattedType);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const getIcon = async () => {
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `token ${token}`,
    };
    try {
      setLoading(true);
      const response = await api.get(`v1/noun/${diagNoun}/`, {
        headers,
      });
      console.log(response.data);
      {
        response.data[0]
          ? setImage(response.data)
          : console.log("no special noun");
      }
    } finally {
      setLoading(false);
    }
  };

  const DeleteThem = async () => {
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `token ${token}`,
    };

    let response = await api
      .delete(`v1/encounters/${id}/`, { headers })
      .catch((err) => {
        alert("could not delete this assessment");
        console.error(err);
      });
    if (response.status === 204) {
      alert("Encounter deleted");
      navigate(`/patient/${pt_id}`);
    }
  };
  useEffect(() => {
    getEncounter();
  }, [id]);
  useEffect(() => {
    getIcon();
  }, [diagNoun]);

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <>
          <Row style={{"width":"100%"}}>
            <Col md={6}>
              <div>
                <h2>Encounter</h2>
                <Card style={{ width: "18rem", margin: "2rem" }}>
                  <Card.Title>
                    Admitted: {encounterDate}
                    {encounterTime}{" "}
                  </Card.Title>
                  <Card.Img variant="top" src={image} />
                  <Card.Body>
                    Name: 
                    <br/>
                    {encounter.patient_id.last_name} ,{" "} 
                    {encounter.patient_id.first_name}
                    <br />
                    DOB: {encounter.patient_id.date_of_birth}
                    <br />
                    Pt ID: {encounter.patient_id.id}
                    <br />
                    DX: {encounter.diagnosis}
                  </Card.Body>
                  <Button 
                  className="btn btn-warning m-2"
                  onClick={() => navigate(`/encounter/${id}/edit`)}>
                    Edit Encounter
                  </Button>
                  <Button
                    className="btn btn-success m-2"
                    onClick={() =>
                      navigate(
                        `/encounter/${id}/addassessment/${encounter.patient_id.id}`
                      )
                    }
                  >
                    Add an assessment
                  </Button>
                  <Button
                    variant="primary"
                    className="btn btn-secondary m-2"
                    onClick={() => navigate(`/allassessments/${id}`)}
                  >
                    View all assessments
                  </Button>
                  <Button onClick={DeleteThem} className="btn btn-danger m-2">Delete Encounter</Button>
                </Card>
              </div>
            </Col>
            <Col md={3}>
              {/* <h2>Assessment summary</h2> */}
              <SumerizeAssessments id={id} />
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default Encounters;
