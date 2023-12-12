import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cards from "../components/Card";
import { api } from "../utilities";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
// getting all assessments by encounter ID
const Assessments = () => {
  const [patient, setPatient] = useState({});
  const [loading, setLoading] = useState(true);
  const [summarized, setSummarized] = useState("");
  const [assessments, setAssessments] = useState({});
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
      const response = await api.get(`v1/assessments/encounter/${id}/`, {
        headers,
      });
      console.log(response.data);
      setAssessments(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    getAssessments();
  }, []);

  const getSummary= async () => {
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `token ${token}`,
    };
    // console.log(headers)
    try {
      setLoading(true);
      const response = await api.post(`v1/summary/`,{prompt:{assessments}}, {headers});
      console.log(response.data.response_content);
      // console.log(assessments)
      setSummarized(response.data.response_content);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);  
    }
  };

  useEffect(() => {
    getSummary();
  }, []);


  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <>
          <div>
            <Card style={{ width: "50rem" }}>
              <Card.Title>Assessment Summary</Card.Title>
              <Card.Body>
                <h3>Neuro</h3>
                {summarized["neuro"].summary}
              <br/>
                <h3>Cardiac:</h3>
                {summarized.cardiac.summary}
              <br/>
              <h3>Respiratory:</h3>
              {summarized.respiratory.summary}
              <br/>
              <h3>GI:</h3>
              {summarized.GI.summary}
              <br/>
              <h3>GU:</h3>
              {summarized.GU.summary}
              <br/>
              <h3>Careplan Recommendation:</h3>
              {summarized["careplan Recommendation"]}
              </Card.Body>
            </Card>
          </div>
        </>
      )}
    </>
  );
};

export default Assessments;
