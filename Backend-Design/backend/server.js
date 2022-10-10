const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");

const port = process.env.PORT || 3000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/doctor", require("./routes/doctorRoutes"));
app.use("/patient", require("./routes/PatientRoutes"));
app.use("/disease", require("./routes/diseaseRoutes"));
app.use("/search", require("./routes/searchRoutes"));
app.use("/appointment", require("./routes/appointmentRoutes"));
app.use("/center", require("./routes/centerRoutes"));

app.listen(port, () => {
  console.log("listening on port " + port);
});
