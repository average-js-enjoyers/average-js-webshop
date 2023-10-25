const admin = require("firebase-admin");
const serviceAccount = require("./../config/firebase/serviceAccountKey.json");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://average-js-webshop.appspot.com",
});

exports.create = async (uploadedImage, newfileName) => {
  const imageBuffer = uploadedImage.path; // The image data

  const processedImageBuffer = await sharp(imageBuffer)
    .resize({ width: 400 })
    .toBuffer();

  const bucket = admin.storage().bucket();

  const filePath = `profile-photos/${newfileName}.jpg`;

  const file = bucket.file(filePath);

  // Stream the file to Firebase Storage
  const fileStream = file.createWriteStream({
    metadata: {
      contentType: "image/jpeg", // Adjust the content type based on your file type
    },
    validation: "md5",
  });

  fileStream.on("error", (error) => {
    fs.unlink(uploadedImage.path, (err) => {
      if (err) {
        console.error("Error deleting the uploaded file:", err);
      }
    });
  });

  fileStream.on("finish", () => {
    fs.unlink(uploadedImage.path, (err) => {
      if (err) {
        console.error("Error deleting the uploaded file:", err);
      }
    });
  });

  fileStream.write(processedImageBuffer);
  fileStream.end();

  return `https://storage.googleapis.com/${bucket.name}/${filePath}`;
};
