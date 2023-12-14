/* eslint-disable react/prop-types */
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function AssessCard({
  firstName,
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
}) {
  const navigate = useNavigate();
  const [ageInYears, setAgeInYears] = useState();

  function calculateAge() {
    const currentDate = new Date();
    const dob = new Date(age);
    const ageDifference = currentDate - dob;
    setAgeInYears(Math.floor(ageDifference / (365.25 * 24 * 60 * 60 * 1000)));
    // console.log(`The age is: ${ageInYears} years`);
  }

  useEffect(() => {
    calculateAge();
  }, [age]);

  return (
    <Card style={{ width: "80rem", margin: "1rem" }}>
      {/* <Card.Img variant="top" src={image} /> */}
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
          <h4>patient:</h4>
          {firstName} {lastName}
          <br />
          <h3>age:</h3>
          {ageInYears}
          <br />
          <h3>neuro:</h3>
          {neuro}
          <br />
          <h3>cardio:</h3>
          {cardio}
          <br />
          <h3>respiratory:</h3>
          {respiratory}
          <br />
          <h3>GI:</h3>
          {gi}
          <br />
          <h3>GU:</h3>
          {gu}
        </Card.Text>
        <Button variant="primary" onClick={() => navigate(`/patient/${id}/`)}>
          Go to Assessment
        </Button>
      </Card.Body>
    </Card>
  );
}
export default AssessCard;
