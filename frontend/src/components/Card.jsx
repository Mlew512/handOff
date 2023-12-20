/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { api } from "../utilities";
import AProfile from "../pages/UserProfile";

function Cards({ firstName, lastName, id, sex, age, pmh, allergies, assignmentIds, assignments }) {
  const [isAssigned, setIsAssigned] = useState(false);
  const [ageInYears, setAgeInYears] = useState();


  function calculateAge() {
    const currentDate = new Date();
    const dob = new Date(age);
    const ageDifference = currentDate - dob;
    setAgeInYears(Math.floor(ageDifference / (365.25 * 24 * 60 * 60 * 1000)));
  }

  async function toggleAssignment() {
    const token = localStorage.getItem("token");  

    const headers = {
      Authorization: `token ${token}`,
    };
    try {
      const updatedAssignments = isAssigned
        ? assignmentIds.filter(assignId => assignId !== id)
        : [...assignmentIds, id];

       await api.put("v1/users/", { assignments: updatedAssignments }, {headers});

      setIsAssigned(!isAssigned);
    } catch (error) {
      console.error("Error updating assignments:", error);
    }
  }

  useEffect(() => {
    calculateAge();
    const userIdToCheck = id 
    if(assignmentIds){
      setIsAssigned(assignmentIds.includes(userIdToCheck));
    }
  }, [age, assignmentIds]);

  return (
    <Card style={{ width: "18rem", margin: "2rem" }}>
      <Card.Body>
        <Card.Title>
          <Link to={`../patient/${id}/`}>{lastName}, {firstName}</Link>
        </Card.Title>
        <Card.Text>
          id: {id}
          <br />
          Age: {ageInYears}
          <br />
          Sex: {sex}
          <br />
          Allergies: {allergies}
          <br />
          Past Medical history: {pmh}
        </Card.Text>
        <Button className={isAssigned? "btn btn-danger" : "btn btn-success"}onClick={toggleAssignment}>
          {isAssigned ? "remove" : "assign"}
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Cards;
