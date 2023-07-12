import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// get all reviews
router.get("/", async (req, res) => {
  let collection = await db.collection("reviews");
  let results = await collection.find({}).toArray();
  res.status(200).json(results);
});

// get single review by id
router.get("/:id", async (req, res) => {
  let collection = await db.collection("reviews");
  let query = {_id: new ObjectId(req.params.id)};
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.status(200).json(result);
});

// create new review
router.post("/", async (req, res) => {
  let newReview = {
    title: req.body.title,
    movie_name: req.body.movie_name,
    image: req.body.image,
    rec: req.body.rec,
    rating: req.body.rating,
    date: req.body.date,
    review_text: req.body.review_text
  };
  let collection = await db.collection("reviews");
  let result = await collection.insertOne(newReview);
  if (!result)res.send("coULD not find").status(404);
  else res.send(result).status(204);
});

// This section will help you update a record by id.
router.patch("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const updates =  {
    $set: {
        title: req.body.title,
        movie_name: req.body.movie_name,
        image: req.body.image,
        rec: req.body.rec,
        rating: req.body.rating,
        date: req.body.date,
        review_text: req.body.review_text
    }
  };

  let collection = await db.collection("reviews");
  let result = await collection.updateOne(query, updates);

  res.send(result).status(200);
});

// This section will help you delete a record
router.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  const collection = db.collection("reviews");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

export default router;