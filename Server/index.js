const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Load environment variables
require('dotenv').config();

// MongoDB connection
const mongoUrl = process.env.MONGODB_URL;
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();

// Middleware
app.use(cors({
    origin: ["https://e-dashboard-two.vercel.app"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());

// Schemas
const User = require('./Schema');
const Product = require('./ProductSchema');

// Routes
app.post('/signup', async (req, res) => {
    try {
        let Myuser = new User(req.body);
        let result = await Myuser.save();
        result = result.toObject();
        delete result.password;
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/login', async (req, res) => {
    try {
        if (req.body.password && req.body.email) {
            let user = await User.findOne(req.body).select("-password");
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ result: 'No user Found' });
            }
        } else {
            res.status(400).json({ result: 'Invalid request' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/Add', async (req, res) => {
    try {
        let NewProduct = new Product(req.body);
        let Products = await NewProduct.save();
        res.status(201).json(Products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Add other routes...

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
