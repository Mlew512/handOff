import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../utilities";
import AssessCard from "../components/AssessCard";


const AllAssessments = () => {
    const [loading, setLoading] = useState(true);
    const [assessments, setAssessments] = useState([]);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
  
    const getAssessments = async () => {
      const token = localStorage.getItem("token");
  
      const headers = {
        Authorization: `token ${token}`,
      };
  
      try {
        setLoading(true);
        const response = await api.get(`v1/assessments/encounter/${id}/`, {
          headers,
        });
        {response.data.length >0 &&
          setAssessments(response.data);
        }
  
  
      
      } catch (error) {
        setError("No Assessments for this encounter");
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      getAssessments();
    }, []);


return (
    <>
    <h1>Assessments for encounter </h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <>
          {assessments.map((assessment, idx) => (
            <div key={idx}>
              <AssessCard
                assess_time={assessment.assessment_time}
                pt_id={assessment.encounter.patient_id.id}
                provider={assessment.provider.profession}
                pFirstName={assessment.provider.first_name}
                pLastName={assessment.provider.last_name}
                firstName={assessment.encounter.patient_id.first_name}
                lastName={assessment.encounter.patient_id.last_name}
                age={assessment.encounter.patient_id.date_of_birth}
                neuro={assessment.neuro}
                cardio={assessment.cardio}
                respiratory={assessment.respiratory}
                gi={assessment.gastrointestinal}
                gu={assessment.genitourinary}
                id={assessment.id}
                
              />
            </div>
          ))}
        </>
      )}
    </>
  );
};
export default AllAssessments;