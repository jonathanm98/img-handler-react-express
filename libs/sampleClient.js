const { S3Client } = require("@aws-sdk/client-s3");
// Set the AWS Region.
require("dotenv").config();

const REGION = process.env.AWS_S3_REGION; //e.g. "us-east-1"
// Create an Amazon S3 service client object.
const s3Client = new S3Client({
  region: REGION,
  credential: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});
module.exports = { s3Client };
