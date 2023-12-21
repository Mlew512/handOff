import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../utilities";
import EditCard from "../components/EditCard";


const EditAssessment = () => {
    const [loading, setLoading] = useState(true);
    const [assessment, setAssessment] = useState([]);
    const [error, setError] = useState(null);
    const { id } = useParams();
  
    const getAssessment = async () => {
      const token = localStorage.getItem("token");
  
      const headers = {
        Authorization: `token ${token}`,
      };
  
      try {
        setLoading(true);
        const response = await api.get(`v1/assessments/${id}/`, {
          headers 
        });
        // console.log(response.data)
        setAssessment(response.data);
  
  
      
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      getAssessment();
    }, []);
  

return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <>
              <EditCard
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
                id={assessment.id}
                
             />
        </>
      )}
    </>
  );
};
export default EditAssessment;