import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../utilities";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";

// getting all assessments by encounter ID
const Assessments = () => {
  const [loading, setLoading] = useState(true);
  const [summarized, setSummarized] = useState("");
  const [assessments, setAssessments] = useState({});
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const getAssessments = async () => {
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `token ${token}`,
    };
    // console.log(headers)
    try {
      setLoading(true);
      // console.log(JSON.stringify({ prompt: { assessments } }));
      const response = await api.get(`v1/assessments/encounter/${id}/`, {
        headers,
      });
      console.log(response.data);
      setAssessments(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAssessments();
  }, []);

  const getSummary = async () => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `token ${token}`,
    };

    try {
      setLoading(true);
      const response = await api.post(
        `v1/summary/`,
        {prompt:{assessments}},
        { headers }
      );
      setSummarized(response.data.response_content);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateSummary = () => {
    getSummary();
  };;

  return (
    <>
        <br/>
      {loading && <p>Generating Assessment Summary....</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <>
          <div>
          <Button onClick={handleGenerateSummary}>Generate Summary</Button>
            <Card style={{ width: "50rem" }}>
              <Card.Title>Assessment Summary</Card.Title>
              <Card.Body>
                <h3>Neuro</h3>
                {summarized && summarized.neuro && summarized.neuro.summary}
                <br />
                <h3>Cardiac:</h3>
                {summarized && summarized.cardiac && summarized.cardiac.summary}
                <br />
                <h3>Respiratory:</h3>
                {summarized && summarized.respiratory && summarized.respiratory.summary}
                <br />
                <h3>GI:</h3>
                {summarized && summarized.GI && summarized.GI.summary}
                <br />
                <h3>GU:</h3>
                {summarized && summarized.GU && summarized.GU.summary}
                <br />
                <h3>Careplan Recommendation:</h3>
                {summarized && summarized.careplan&& summarized.careplan}
              </Card.Body>
            </Card>
          </div>
        </>
      )}
    </>
  );
};

export default Assessments;
