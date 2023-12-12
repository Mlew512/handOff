/* eslint-disable react/prop-types */
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import {useState, useEffect} from 'react';

function Cards({ firstName,lastName, id, age, pmh, allergies}) {
  
    const navigate = useNavigate();
    const [ageInYears, setAgeInYears]=useState()
    // const [isFavorite, setIsFavorite] = useState(false);
    
    // useEffect(() =>{
    //     const isFavorite = favorites.some((favorite) => favorite.id === id);
    //     setIsFavorite(isFavorite);
    //     // console.log(isFavorite)
    // }, [favorites, id]);

    function calculateAge() {
      const currentDate = new Date();
      const dob = new Date(age)
      const ageDifference = currentDate - dob;
      setAgeInYears(Math.floor(ageDifference / (365.25 * 24 * 60 * 60 * 1000)))
      // console.log(`The age is: ${ageInYears} years`);
  }

  useEffect(()=>{
    calculateAge()
  },[age]);
  
  

  return (
    <Card style={{ width: "18rem" }}>
      {/* <Card.Img variant="top" src={image} /> */}
      <Card.Body>
        <Card.Title>{firstName}{lastName}</Card.Title>
        <Card.Text>
          id: {id}
          <br />
          age: {ageInYears}
          <br />
          allergies: {allergies}
          <br />
          Past Medical history: {pmh}
        </Card.Text>
        <Button variant="primary" onClick={() => navigate(`/patient/${id}/`)}>
          Go to patient
        </Button>
        <br />
        {/* <button className={isFavorite ? "hidden" : "btn btn-success"}
          onClick={() => {
            if (favorites.length < 4) {
            setFavorites([...favorites, { "id": id, "name": name, "image": image }])
          }
            else {
                alert("Max number of favorites already added");
            }
          }
        }
        >
          Favorite
        </button> */}
        {/* <button className={isFavorite ? "btn btn-danger" : "hidden"}
        onClick={() =>setFavorites(favorites.filter(favorite => favorite.id !== id))}>Remove</button> */}
      </Card.Body>
    </Card>
  );
}
export default Cards;
