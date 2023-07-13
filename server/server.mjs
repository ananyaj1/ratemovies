import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import reviews from "./routes/review.mjs";
import bodyParser from "body-parser";
import mongoose from "mongoose";
const PORT = process.env.PORT || 5050;
const connectionString = process.env.ATLAS_URI || "";
const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));


mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

  app.use("/review", reviews);

  export default app;
