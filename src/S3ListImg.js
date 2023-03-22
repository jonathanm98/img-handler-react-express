import React, { useEffect } from "react";
import AWS from "aws-sdk";
import axios from "axios";

const S3ListObjects = ({ fileChanged, setFileChanged }) => {
  const [listObjects, setListObjects] = React.useState([]);

  useEffect(() => {
    setFileChanged(false);
    // Configure AWS SDK
    AWS.config.update({
      region: process.env.REACT_APP_AWS_S3_REGION,
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    });

    // Create an S3 service object
    const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

    // Get the list of objects in the bucket
    const params = { Bucket: process.env.REACT_APP_AWS_S3_BUCKET_NAME };
    s3.listObjects(params, (err, data) => {
      if (err) {
        console.log(err, err.stack);
      } else {
        setListObjects(
          data.Contents.filter(
            (item) =>
              item.Key.split(".")[1] === "jpg" ||
              item.Key.split(".")[1] === "png" ||
              item.Key.split(".")[1] === "jpeg"
          )
        );
      }
    });
    // eslint-disable-next-line
  }, [fileChanged]);

  const handleDeleteImage = async (imageName) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}${imageName}`
      );
      console.log(response.data);
      setFileChanged(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="img-container">
      {listObjects.length === 0 ? (
        <div>
          <h1>Aucune data</h1>
        </div>
      ) : (
        listObjects.map((item) => (
          <div key={item.Key} className="img">
            <img
              src={`https://jonathanm98s3.s3.eu-west-3.amazonaws.com/${item.Key}`}
              alt={item.Key}
            />
            <button onClick={() => handleDeleteImage(item.Key)}>
              Supprimer
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default S3ListObjects;
