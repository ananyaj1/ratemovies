import express from "express";
import cors from "cors";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import "./loadEnvironment.mjs";
import reviews from "./routes/review.mjs";
import movies from "./routes/movie.mjs";
import feedback from "./routes/feedback.mjs";
import bodyParser from "body-parser";
import mongoose from "mongoose";
const PORT = process.env.PORT || 5050;
const connectionString = process.env.ATLAS_URI || "";
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
  app.use("/movie", movies);
  app.use("/feedback", feedback);
  // Catch-all route
  app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '..', 'client', 'public', 'index.html'));
  });

  export default app;
