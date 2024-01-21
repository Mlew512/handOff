import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../utilities";
import EditECard from "../components/EditEncounterCard";


const EditEncounter = () => {
    const [loading, setLoading] = useState(true);
    const [encounter, setEncounter] = useState([]);
    const [error, setError] = useState(null);
    const { id } = useParams();
  
    const getEncounter = async () => {
      const token = localStorage.getItem("token");
  
      const headers = {
        Authorization: `token ${token}`,
      };
  
      try {
        setLoading(true);
        const response = await api.get(`v1/encounters/${id}/`, {
          headers,
        });
        // console.log(response.data)
        setEncounter(response.data);
  
  
      
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      getEncounter();
    }, []);
  

return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <>
              <EditECard
                admit_date={encounter.admit_date}
                diagnosis={encounter.diagnosis}
                admitted={encounter.admitted}
                id={encounter.id}
                
             />
        </>
      )}
    </>
  );    
};
export default EditEncounter;