/* eslint-disable react/prop-types */
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../utilities";
import { Link } from "react-router-dom";
import { format } from "date-fns";

function AnAssessCard({
  firstName,
  id,
  lastName,
  time,
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
  const [assessId] = useState(id);
  const formattedDate = format(new Date(time), "MM-dd-yyyy");
  const formattedTime = format(new Date(time), "HH:mm:ss");

  function calculateAge() {
    const currentDate = new Date();
    const dob = new Date(age);
    const ageDifference = currentDate - dob;
    setAgeInYears(Math.floor(ageDifference / (365.25 * 24 * 60 * 60 * 1000)));
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
      alert("assessment deleted");
      navigate(`/patient/${pt_id}`);
    }
  };
  useEffect(() => {
    calculateAge();
  }, [age]);

  return (
    <Card style={{ margin: "1rem" }}>
      <Card.Body>
        <div className="row">
          <div className="col-md-4">
            <Card.Title>
            <Link to={`../patient/${id}/`}>{firstName} {lastName}</Link>
              <h3>Age:</h3>
              {ageInYears}
            </Card.Title>
          </div>
          <div className="col-md-4">
            <h3>Date:</h3>
            {formattedDate}
            <br />
            <h3>Time:</h3>
            {formattedTime}
          </div>
          <div className="col-md-4">
            <h3>Provider:</h3>
            {provider} {pFirstName} {pLastName}
          </div>
        </div>
        <Card.Text>
          <br />
          <h3>Neuro:</h3>
          {neuro}
          <br />
          <h3>Cardio:</h3>
          {cardio}
          <br />
          <h3>Respiratory:</h3>
          {respiratory}
          <br />
          <h3>Gastrointestinal:</h3>
          {gi}
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
        <Button className="btn btn-danger m-2" onClick={DeleteThem}>
          Delete Assessment
        </Button>
      </Card.Body>
    </Card>
  );
}

export default AnAssessCard;
