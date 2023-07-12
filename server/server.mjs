import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import reviews from "./routes/review.mjs";
import bodyParser from "body-parser";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));


app.use("/review", reviews);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
