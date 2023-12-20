/* eslint-disable react/prop-types */
import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Col, Row } from "react-bootstrap";
import EditProfile from "../pages/EditProfile";
import Cards from "./Card";

function AProfileCard({
  assignments,
}) {
  const assignmentIds = assignments.map((patient) => patient.id);

  return (
    <>
      <EditProfile />

      <Row id="patientsPage" xs={1} md={2} lg={3} xl={4} xxl={5} className="g-4">
        <h2>Assigned Patients:</h2>
        <br />
        {assignments.map((patient) => (
          <Col key={patient.id} md={8} lg={8} xl={8}>
            <Cards
              id={patient.id}
              firstName={patient.first_name}
              lastName={patient.last_name}
              sex={patient.sex}
              age={patient.date_of_birth}
              pmh={patient.past_medical_history}
              allergies={patient.allergies}
              assignmentIds={assignmentIds}
              assignments={assignments}
            />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default AProfileCard;
