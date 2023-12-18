/* eslint-disable react/prop-types */
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Cards({ firstName, lastName, id, age, pmh, allergies }) {
  const navigate = useNavigate();
  const [ageInYears, setAgeInYears] = useState();
  function calculateAge() {
    const currentDate = new Date();
    const dob = new Date(age);
    const ageDifference = currentDate - dob;
    setAgeInYears(Math.floor(ageDifference / (365.25 * 24 * 60 * 60 * 1000)));
    
  }

  useEffect(() => {
    calculateAge();
  }, [age]);

  return (
    <Card style={{ width: "18rem", margin: "2rem"}}>
      <Card.Body>
        <Card.Title>
        <Link to={`../patient/${id}/`}>{firstName} {lastName}</Link>
        </Card.Title>
        <Card.Text>
          id: {id}
          <br />
          Age: {ageInYears}
          <br />
          Allergies: {allergies}
          <br />
          Past Medical history: {pmh}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
export default Cards;
