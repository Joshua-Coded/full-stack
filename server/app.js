import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'; dotenv.config();
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from './models/user.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Unified CORS configuration
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

app.use(express.json());

// use client app
app.use(express.static(path.join(__dirname, '/client/build')));

// render client for any path
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
})


// Database connection
mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

// Registration Endpoint
app.post('/register', async (req, res) => {
    try {
        const { email, password, name, role } = req.body;
        const existingUser = await User.findOne({ email: email.toLowerCase() });

        if (existingUser) {
            return res.status(400).send({ message: "Email already in use." });
        }

        const user = new User({
            email: email.toLowerCase(),
            password: password,
            name,
            role
        });

        await user.save();

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

        res.status(201).send({
            user: { id: user._id, email: user.email, name: user.name, role: user.role },
            token
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "An error occurred during registration." });
    }
});

// Login Endpoint
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);

    const normalizedEmail = email.toLowerCase();

    console.log(`Login attempt for: ${normalizedEmail}`);

    try {
        const user = await User.findOne({ email: normalizedEmail });
        if (!user) {
            console.log(`No user found with email: ${normalizedEmail}`);
            return res.status(400).send({ message: "User not found." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log(`Password mismatch for user: ${user.email}`);
            return res.status(400).send({ message: "Invalid credentials." });
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

        res.status(200).send({
            message: "Login successful",
            token,
            user: { name: user.name, email: user.email },
        });

    } catch (error) {
        console.error(`Error during login for ${normalizedEmail}:`, error);
        res.status(500).send({ message: "An error occurred during login." });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
