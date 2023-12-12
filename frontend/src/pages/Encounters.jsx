import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cards from "../components/Card";
import { api } from "../utilities";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Assessments from "../components/GetAssessments";

const Encounters= () => {
  const [loading, setLoading] = useState(true);
  const [encounter, setEncounter] = useState({});
  const[encounterDate, setEncounterDate] = useState("")
  const[diagNoun, setDiagNoun]= useState("patient")
  const [error, setError] = useState(null);
  const [image, setImage] = useState("")
  const navigate = useNavigate();
  const { id } = useParams();

  const getEncounter = async () => {
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
      const encounterType= response.data.diagnosis
      const formattedType= encounterType.split(" ")[0];
      setDiagNoun(formattedType)
      
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
    // console.log(headers)
    try {
      setLoading(true);
      const response = await api.get(`v1/noun/${diagNoun}/`, {
        headers,
      });
      console.log(response.data);
      setImage(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
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
          <div>
            <h2>Encounter</h2>
            <Card style={{ width: "18rem" }}>
              <Card.Title>Admitted: {encounterDate}</Card.Title>
              <Card.Img variant="top" src={image}/>
              <Card.Body>
                Name: {encounter.patient_id.first_name} {encounter.patient_id.last_name}
                <br/>
                DOB: {encounter.patient_id.date_of_birth}
                <br/>
                DX: {encounter.diagnosis}
              </Card.Body>
            </Card>
            <h2>Assessment summary</h2>
          </div>
          <Assessments id={id} />
        </>
      )}
    </>

  );
};

export default Encounters;
