const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const fileUpload = require("express-fileupload");

const app = express();
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: "*" }));
app.use(fileUpload());

app.use("/uploads/doctor/profiles", express.static("uploads/doctor/profiles/"));
app.use(
  "/uploads/patient/profiles",
  express.static("uploads/patient/profiles/")
);

// Main Routes
const authRoute = require("./api/routes/auth");
const doctorRoute = require("./api/routes/doctor");
const patientRoute = require("./api/routes/patient");
const adminRoute = require("./api/routes/admin");
const clientRoute = require("./api/routes/client");
const medicineRoute = require("./api/routes/medicine");
const diseaseRoute = require("./api/routes/disease");
const prescriptionRoute = require("./api/routes/prescription");
const diagnosticCenterRoute = require("./api/routes/diagnosticCenter");
const councilsRoute = require("./api/routes/councilHourRoutes");
const queueRoute = require("./api/routes/queue");
const remainingTimeRoute = require("./api/routes/remainingTime");

// API URL's
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/doctor", doctorRoute);
app.use("/api/v1/patient", patientRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/client", clientRoute);
app.use("/api/v1/medicine", medicineRoute);
app.use("/api/v1/disease", diseaseRoute);
app.use("/api/v1/prescription", prescriptionRoute);
app.use("/api/v1/diagnosticCenter", diagnosticCenterRoute);
app.use("/api/v1/councils", councilsRoute);
app.use("/api/v1/queue", queueRoute);
app.use("/api/v1/time", remainingTimeRoute)

app.get("/", (req, res) => {
  res.send("Hello I am node.js application");
});

mongoose.connect(
  "mongodb+srv://admin:admin@medaiddemocluster.irpxsvn.mongodb.net/medaid-demo?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (!err) {
      console.log("MongoDB Connection Succeeded.");
    } else {
      console.log("Error in DB connection : " + err);
    }
  }
);
// App Port
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`App running on ${port} port`);
});
