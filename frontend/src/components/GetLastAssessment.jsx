// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { api } from "../utilities";
// import Card from "react-bootstrap/Card";
// import Button from "react-bootstrap/esm/Button";

// // getting all assessments by encounter ID
// const LastAssessments = () => {
//   const [loading, setLoading] = useState(true);
//   const [assessments, setAssessments] = useState([]);
//   const [error, setError] = useState(null);
//   const [lastAssess, setLastAssess] = useState(0)
//   const { encounter_id } = useParams();
//   const navigate = useNavigate();

//   const getAssessments = async () => {
//     const token = localStorage.getItem("token");

//     const headers = {
//       Authorization: `token ${token}`,
//     };

//     try {
//       setLoading(true);
//       const response = await api.get(`v1/assessments/encounter/${encounter_id}/`, {
//         headers,
//       });
//       setAssessments(response.data);
//       setLastAssess(response.data.length-1)
    
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getAssessments();
//   }, [encounter_id]);

//   return (
//     <>
//       <br />
//       {loading && <p>Gathering Assessments</p>}
//       {error && <p>Error: {error}</p>}
//       {!loading && !error && (
//         <>
//           <div>
//             <Card style={{ width: "50rem" }}>
//               <Card.Title>Most Recent Assessment </Card.Title>
//               <Card.Body>
//                 <h3>Neuro:</h3>
//                 {assessments && assessments[lastAssess].neuro}
//                 <br />
//                 <h3>Cardiac:</h3>
//                 {assessments && assessments[lastAssess].cardio}
//                 <br />
//                 <h3>Respiratory:</h3>
//                 {assessments && assessments[lastAssess].respiratory}
//                 <br />
//                 <h3>GI:</h3>
//                 {assessments && assessments[lastAssess].gastrointestinal}
//                 <br />
//                 <h3>GU:</h3>
//                 {assessments && assessments[lastAssess].genitourinary}
//               </Card.Body>
//             </Card>
//           </div>
//         </>
//       )}
//     </>
//   );
// };

// export default LastAssessments;
