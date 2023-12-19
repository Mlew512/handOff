import React, { useState, useEffect } from "react";
import { api } from "../utilities";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import Cards from "../components/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const SearchResults = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { searchValue } = useParams();

  useEffect(() => {
    const getPatients = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Authentication token not found.");
        }

        const headers = {
          Authorization: `token ${token}`,
        };

        const isNumericID = /^\d+$/.test(searchValue);
        let response;

        if (isNumericID) {
          response = await api.get(`v1/patients/${searchValue}/`, { headers });
        } else {
          response = await api.get(`v1/patients/${searchValue}/`, { headers });
        }

        if (Array.isArray(response.data)) {
          const sortedPatients = response.data.sort((a, b) => a.last_name.localeCompare(b.last_name));
          setPatients(sortedPatients);
        } else {
          setPatients([response.data]);
        }
      } catch (error) {
        console.error("Error fetching patients:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getPatients();
  }, [searchValue]);

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <>
          {patients.length === 0 ? (
            <p>No matching results found.</p>
          ) : (
            <Row xs={1} md={2} lg={3} className="g-4">
              {patients.map((patient) => (
                <Col key={patient.id}>
                  <Cards
                    id={patient.id}
                    firstName={patient.first_name}
                    lastName={patient.last_name}
                    birthDate={patient.date_of_birth}
                    pmh={patient.past_medical_history}
                    allergies={patient.allergies}
                  />
                </Col>
              ))}
            </Row>
          )}
        </>
      )}
    </>
  );
};

export default SearchResults;
