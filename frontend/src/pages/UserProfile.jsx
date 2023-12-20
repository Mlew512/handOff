//get user by id    
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import APatientCard from "../components/APatientCard.jsx";
import { api } from "../utilities";
import EncounterCards from "../components/EncounterCard.jsx";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AProfileCard from "../components/AProfileCard.jsx";

const AProfile = () => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getProfile = async () => {
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `token ${token}`,
    };

    try {
      setLoading(true);
      const response = await api.get(`v1/users/`, { headers });
      console.log(response.data)
      setProfile(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <>
          <Row>
            <Col md={6}>
              <AProfileCard
                id={profile?.id}
                profession={profile?.profession}
                firstName={profile?.first_name}
                lastName={profile?.last_name}
                assignments={profile?.assignments}
              />
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default AProfile;
