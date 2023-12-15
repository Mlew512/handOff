/* eslint-disable react/prop-types */
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../utilities";

function AnAssessCard({
  firstName,
  id,
  lastName,
  time,
  dob,
  provider,
  pFirstName,
  pLastName,
  age,
  neuro,
  cardio,
  respiratory,
  gi,
  gu,
  pt_id,
}) {
  const navigate = useNavigate();
  const [ageInYears, setAgeInYears] = useState();
  const [assessId, setAssesId] = useState(id);


  function calculateAge() {
    const currentDate = new Date();
    const dob = new Date(age);
    const ageDifference = currentDate - dob;
    setAgeInYears(Math.floor(ageDifference / (365.25 * 24 * 60 * 60 * 1000)));
    // console.log(`The age is: ${ageInYears} years`);
  }

  const DeleteThem = async () => {
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `token ${token}`,
    };

    let response = await api
      .delete(`v1/assessments/${id}/`, { headers })
      .catch((err) => {
        alert("could not delete this assessment");
        console.error(err);
      });
    if (response.status === 204) {
      alert("assessment deleted")
      navigate(`/patient/${pt_id}`)
    }
  };
  useEffect(() => {
    calculateAge();
  }, [age]);

  return (
    <Card style={{ width: "80rem", margin: "1rem" }}>
      <Card.Body>
        <Card.Title>
          {firstName} {lastName}
        </Card.Title>
        <Card.Text>
          <h3>date:</h3>
          {time}
          <h3>Time:</h3>
          <h3>provider:</h3>
          {provider} {pFirstName} {pLastName}
          <br />
          <h3>patient:</h3>
          {firstName} {lastName}
          <br />
          <h3>age:</h3>
          {ageInYears}
          <br />
          <h3>neuro:</h3>
          {neuro}
          <br />
          <h3>GU:</h3>
          {gu}
        </Card.Text>
        <Button
          variant="primary"
          onClick={() => navigate(`/assessments/${assessId}/edit/`)}
        >
          Edit Assessment
        </Button>
        <Button variant="danger" onClick={DeleteThem}>
          Delete Assessment
        </Button>
      </Card.Body>
    </Card>
  );
}
export default AnAssessCard;
