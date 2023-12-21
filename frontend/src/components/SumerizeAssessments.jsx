import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../utilities";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const SumerizeAssessments = () => {
  const [loading, setLoading] = useState(true);
  const [summarized, setSummarized] = useState({});
  const [error, setError] = useState(null);
  const { id } = useParams();

  const getAssessments = async () => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `token ${token}`,
    };

    try {
      setLoading(true);
      const response = await api.get(`v1/assessments/gpt/${id}/`, {
        headers,
      });
      setSummarized(response.data);
    } catch (error) {
      setError("No assessments yet!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAssessments();
  }, [id]);

  const getSummary = async () => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `token ${token}`,
    };

    try {
      setLoading(true);
      const response = await api.post(
        `v1/summary/`,
        { prompt: summarized },
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
  };

  return (
    <>
      <br />
      <Card style={{ width: "50rem" }}>
        <Card.Title>Assessment Summary</Card.Title>
        <Card.Body>
          {loading && <Button disabled>Generating</Button>}
          {!loading && (
            <Button onClick={handleGenerateSummary}>Generate</Button>
          )}
          {Object.keys(summarized).length > 3 ? (
            Object.keys(summarized).map((key) => (
              <React.Fragment key={key}>
                <h3>{key.charAt(0).toUpperCase() + key.slice(1)}</h3>
                {summarized[key] && summarized[key].summary}
                <br />
              </React.Fragment>
            ))
          ) : (
            <p>Summarize assessment data from the last 12 hours.</p>
          )}
        </Card.Body>
      </Card> 
      {error && <p>Error: {error}</p>}
    </>
  );
};

export default SumerizeAssessments;
