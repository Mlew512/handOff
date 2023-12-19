import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from "date-fns";

function calculateAge(dob) {
  const currentDate = new Date();
  const dateOfBirth = new Date(dob);
  const ageDifference = currentDate - dateOfBirth;
  return Math.floor(ageDifference / (365.25 * 24 * 60 * 60 * 1000));
}

function AssessCard({
  firstName,
  id,
  lastName,
  pt_id,
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
}) {
  const navigate = useNavigate();
  const [ageInYears, setAgeInYears] = useState(calculateAge(age));
  const formattedDate = format(new Date(time), "MM-dd-yyyy");
  const formattedTime = format(new Date(time), "HH:mm:ss");
  console.log(id)

  useEffect(() => {
    setAgeInYears(calculateAge(age));
  }, [age]);

  return (
    <Card style={{ margin: "1rem" }}>
      <Card.Body>
        <div className="row">
          <div className="col-md-4">
            <Card.Title>
              <Link to={`../patient/${pt_id}/`}>
                {lastName} , {firstName}
              </Link>
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
            {provider}: {pFirstName} {pLastName}
            <br />
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
          onClick={() => navigate(`/assessments/${id}`)}
        >
          Go to assessment
        </Button>
      </Card.Body>
    </Card>
  );
}

export default AssessCard;
