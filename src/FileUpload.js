import React, { useState } from "react";
import axios from "axios";

const FileUpload = ({ setFileChanged }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageName, setImageName] = useState("");

  const fileSelectedHandler = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.type.match("image.*")) {
        setSelectedFile(file);
      } else {
        alert("Seules les images sont autorisées");
      }
    }
  };

  const fileUploadHandler = async () => {
    const formData = new FormData();
    formData.append("image", selectedFile);
    try {
      const response = await axios.post(
        "http://localhost:3001/api/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(response.data);
      setFileChanged(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageNameChange = (event) => {
    setImageName(event.target.value);
  };

  const handleDeleteImage = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/api/images/${imageName}`
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <div className="upload">
        <h2>Télécharger une image</h2>
        <input
          type="file"
          accept=".png, .jpeg, .jpg"
          onChange={fileSelectedHandler}
        />
        <button onClick={fileUploadHandler}>Télécharger</button>
      </div>
      <div className="delete">
        <h2>Supprimer une image</h2>
        <label>
          Nom de l'image à supprimer:
          <input
            type="text"
            value={imageName}
            onChange={handleImageNameChange}
          />
        </label>
        <button onClick={handleDeleteImage}>Supprimer</button>
      </div>
    </div>
  );
};

export default FileUpload;
