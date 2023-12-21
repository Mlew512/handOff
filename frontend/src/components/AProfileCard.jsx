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
      <div className="profile-card-container">
        <Row>
          <Col md={6}>
            <EditProfile />
          </Col>
          <Col md={6}>
            <div className="assigned-patients-section">
              <h2 className="section-header p">Assigned Patients:</h2>

              <Row xs={1} md={2} lg={4} xl={5} xxl={6} className="g-4">
                {assignments.map((patient) => (
                  <Col key={patient.id} md={2} lg={3} xl={4} style={{ width: "max-content" }}>
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
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default AProfileCard;
