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

router.get("/:id", async (req, res) => {
    const userID = req.params.id;
    try {
      const user = await User.findById(userID);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
});
// create new user
router.post("/", async (req, res) => {
    try {
        const { username, first_name, last_name, email, password, profile_pic } = req.body;
        // Hash the password before saving
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = new User(
            {
                username, first_name, last_name, email, password: hashedPassword, profile_pic,
            });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }
    catch(error){
        console.error('Error creating user:', error);

        if (error.message.includes("duplicate")) {
        let errorMessage;
        if (error.message.includes("email_1")) {
            errorMessage = "Email is already taken. Please use a different email.";
        } else if (error.message.includes("username_1")) {
            errorMessage = "Username is already taken. Please choose a different username.";
        } else {
            errorMessage = "Duplicate key error. Please make sure your email/username is unique.";
        }
        res.status(400).json({ message: errorMessage });
        } else {
        res.status(400).json({ message: error.message });
        }
    }
    
});

//ONLY FOR TESTING PURPOSES! DO not access this endpoint from the client side. 
router.delete("/", async(req, res) => {
    try {
        const deletedUsers = await User.deleteMany();
        if (deletedUsers.deletedCount === 0) {
          return res.status(404).json({ error: "No users found" });
        }
        return res.status(200).json({ message: "All users deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
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
            { userId: user._id, username: user.username, userPic: user.profile_pic },
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