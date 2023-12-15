/* eslint-disable react/prop-types */
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function EncounterCard({ admitted_date, diagnosis, id }) {
  const navigate = useNavigate();

  return (
    <Card style={{ width: "18rem", margin: "2rem" }}>
      <Card.Title>{admitted_date}</Card.Title>
      <Card.Body>
        {diagnosis}
        <br/>
        <Button
          variant="primary"
          onClick={() =>
            navigate(`../encounters/${id}`)
          }
        >
          Go to Encounter
        </Button>
      </Card.Body>
    </Card>
  );
}
export default EncounterCard;
