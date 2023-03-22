import React, { useState } from "react";
import axios from "axios";

const FileUpload = ({ setFileChanged }) => {
  const [selectedFile, setSelectedFile] = useState(null);

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
        `${process.env.REACT_APP_API_URL}api/upload`,
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
    </div>
  );
};

export default FileUpload;
