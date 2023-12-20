/* eslint-disable react/prop-types */
import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function EditProfileCard({ firstName, lastName, id, profession, username }) {
  const [editMode, setEditMode] = useState(false);
  const [editedFirstName, setEditedFirstName] = useState(firstName);
  const [editedLastName, setEditedLastName] = useState(lastName);
  const [editedProfession, setEditedProfession] = useState(profession);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    try {
      // Make a PUT request to update user information
      await axios.put(`v1/users/${id}`, {
        firstName: editedFirstName,
        lastName: editedLastName,
        profession: editedProfession,
      });

      setEditMode(false);
      // You may want to update the profile information in your state or API at this point
    } catch (error) {
      console.error("Error updating user:", error);
      // Handle error as needed
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    // Reset edited values to original values
    setEditedFirstName(firstName);
    setEditedLastName(lastName);
    setEditedProfession(profession);
  };

  return (
    <>
      <Card style={{ width: "18rem", margin: "2rem" }}>
        <Card.Body>
          {editMode ? (
            <>
              <input
                type="text"
                value={editedProfession}
                onChange={(e) => setEditedProfession(e.target.value)}
              />
              <input
                type="text"
                value={editedFirstName}
                onChange={(e) => setEditedFirstName(e.target.value)}
              />
              <input
                type="text"
                value={editedLastName}
                onChange={(e) => setEditedLastName(e.target.value)}
              />
            </>
          ) : (
            <Card.Title>{editedProfession}:</Card.Title>
          )}
          <Card.Text>
            {editMode ? (
              <>
                <br />
                <Button className="m-1" onClick={handleSave}>
                  Save
                </Button>
                <Button className="m-1" onClick={handleCancel}>
                  Cancel
                </Button>
              </>
            ) : (
              <>
                {editedFirstName}, {editedLastName}
                <br />
                username: {username}
                <br />
                id: {id}
                <br />
                <Button className="m-1" onClick={handleEdit}>
                  Edit Profile
                </Button>
              </>
            )}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}

export default EditProfileCard;