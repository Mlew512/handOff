/* eslint-disable react/prop-types */
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cards from "./Card";
import { Col } from "react-bootstrap";
import {Row} from "react-bootstrap";
import EditProfile from "../pages/EditProfile";
EditProfile

function AProfileCard({ firstName, lastName, id, profession, assignments, username }) {
    const navigate = useNavigate();

  return (
    <>
      {/* <Card style={{ width: "18rem", margin: "2rem" }}>
        <Card.Body>
          <Card.Title>
              {profession}:
          </Card.Title>
          <Card.Text>
          {firstName}, {lastName} 
          <br/>
          username: {username}
          <br/>
          id: {id}
          <br/>
            <Button className="m-1">Edit Profile</Button>
          </Card.Text>
        </Card.Body>
      </Card> */}
    <EditProfile />
      
      <Row
        id="patientsPage"
        xs={1}
        md={2}
        lg={3}
        xl={4}
        xxl={5}
        className="g-4"
      >
        <h2>Assignments:</h2>
        <br/>
        {assignments.map((patient) => (
          <Col key={patient.id}>
            <Cards
              id={patient.id}
              firstName={patient.first_name}
              lastName={patient.last_name}
              sex={patient.sex}
              age={patient.date_of_birth}
              pmh={patient.past_medical_history}
              allergies={patient.allergies}
            />
          </Col>
        ))}
      </Row>
    </>
  );
}
export default AProfileCard;
