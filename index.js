require("dotenv").config();
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const {
  DeleteObjectCommand,
  CreateBucketCommand,
} = require("@aws-sdk/client-s3");
const { s3Client } = require("./libs/sampleClient.js");
const multerS3 = require("multer-s3");
const app = express();
app.use(cors());

const upload = multer({
  storage: multerS3({
    s3: s3Client,
    acl: "public-read",
    bucket: process.env.AWS_S3_BUCKET_NAME,
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + "-" + file.originalname);
    },
  }),
});

app.post("/api/upload", async (req, res) => {
  upload.single("image")(req, res, async (error) => {
    if (error) {
      console.log("errors", error);
      res.json({ error: error });
    } else {
      // If File not found
      if (req.file === undefined) {
        console.log("Error: No File Selected!");
        res.json("Error: No File Selected");
      } else {
        // If Success
        const imageName = req.file.key;
        const imageLocation = req.file.location;
        // Save the file name into database into profile model
        res.json({
          image: imageName,
          location: imageLocation,
        });
      }
    }
  });
});

app.delete("/api/images/:imageName", async (req, res) => {
  const imageName = req.params.imageName;
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: imageName,
  };
  try {
    const data = await s3Client.send(new DeleteObjectCommand(params));
    console.log(`Successfully deleted ${imageName}`);
    res.status(200).json({ message: "Deletion successful", data: data });
  } catch (error) {
    console.log("Error deleting file", error);
    res.sendStatus(500);
  }
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
