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
        console.log(response.data)
        setAssessments(response.data);
  
  
      
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      getAssessments();
    }, []);
  
    const handleGoToAnAssessments = () => {
      // Navigate to your desired path
      navigate("/path-to-an-assessment");
    };

return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <>
          {assessments.map((assessment, idx) => (
            <div key={idx}>
              <AssessCard
                time={assessment.assessment_time}
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
                
              />
            </div>
          ))}
        </>
      )}
    </>
  );
};
export default AllAssessments;