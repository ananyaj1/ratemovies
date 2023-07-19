import express from "express";
import Review from "../db/schema.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// get all reviews
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

router.get('/discover', async (req, res) => {
  let genres = req.query.genre || [];
  const rating = req.query.rating || 0;
  const rec = req.query.rec || false;

  const filters = {};

  if (!Array.isArray(genres)) {
    genres = [genres]; // Convert to array if it's a single value
  }

  if (genres.length > 0) {
    filters.$or = genres.map(genre => ({ genre })); // Match any of the specified genres
  }

  if (rating) {
    filters.rating = { $gte: rating };
  }

  if (rec) {
    filters.rec = 'wouldRec';
  }

  try {
    const reviews = await Review.find(filters);
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// get single review by id
router.get("/:id", async (req, res) => {
  const reviewID = req.params.id;
  try {
    const review = await Review.findById(reviewID);
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }
    return res.status(200).json(review);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

// create new review
router.post("/", async (req, res) => {
  try {
    const { title, movie_name, image, rec, rating, date, genre, review_text } = req.body;
    const newReview = new Review(
      {
        title,
        movie_name,
        image,
        rec,
        rating,
        date,
        genre,
        review_text,
      });
    const savedReview = await newReview.save();
    res.status(201).json(savedReview);

  }
  catch(error){
    res.status(400).json({ message: error.message });
  }
  
});

// update review by id
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

router.delete("/", async (req, res) => {
  try {
    const deletedReviews = await Review.deleteMany();
    if (deletedReviews.deletedCount === 0) {
      return res.status(404).json({ error: "No reviews found" });
    }
    return res.status(200).json({ message: "All reviews deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// delete a review by id
router.delete("/:id", async (req, res) => {
  const reviewID = req.params.id;
  try{
    const deletedReview = await Review.findByIdAndDelete(reviewID);
    if(!deletedReview) {
      return res.status(404).json({error: "Review not found"});
    }
    return res.status(200).json({message: "Deleted successfully"});
  }
  catch (error){
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// discover page: get reviews based on query param

export default router;