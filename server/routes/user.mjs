import express from 'express';
import axios from 'axios';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../db/user_schema.mjs';
const router = express.Router();

router.get("/", async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({error: error.message});
    }
});
// create new user
router.post("/", async (req, res) => {
    try {
        const { username, first_name, last_name, email, password } = req.body;
        // Hash the password before saving
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = new User(
            {
                username, first_name, last_name, email, password: hashedPassword
            });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }
    catch(error){
      res.status(400).json({ message: error.message });
    }
    
});

//validate credentials on login
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        // Find the user by their username
        const user = await User.findOne({ username });

        if (!user) {
            // User not found
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Compare the provided password with the hashed password stored in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            // Passwords don't match
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // At this point, the user is authenticated, and you can proceed with the login process

        // Generate a JWT token
        const token = jwt.sign(
            { userId: user._id, username: user.username },
            process.env.TOKEN_KEY_AUTH, // Replace this with a strong, random secret key
            { expiresIn: '3h' } // Token will expire in 3 hours
        );

        // Send the token back to the client
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

export default router;