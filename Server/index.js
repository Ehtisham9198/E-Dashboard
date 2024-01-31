const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// MongoDB connection
const mongoUrl = process.env.'mongodb+srv://b522035:czeByrtqE4ZqGySE@cluster0.qlxwpom.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

// User Schema
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const User = mongoose.model('UserInfos', UserSchema);

// Product Schema
const ProductSchema = new mongoose.Schema({
    USER_Id: String,
    Company: String,
    Category: String,
    Name: String,
    Price: Number,
});

const Product = mongoose.model('Products', ProductSchema);

// Middleware
app.use(cors({
    origin: ["https://e-dashboard-two.vercel.app"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());

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
app.get('/products', async (req, res) => {
    let Productlist = await Product.find();
    res.send(Productlist)

});

app.delete('/product/:id', async (req, res) => {
    const result = await Product.deleteOne({ _id: req.params.id })
})

app.get('/product/:id', async (req, res) => {
    let result = await Product.findOne({ _id: req.params.id });
    res.send(result)
});

app.put('/product/:id', async (req, res) => {
    let result = await Product.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    );
    res.send(result);
});

app.get('/search/:key', async (req, res) => {
    const result = await Product.find({
        $or: [
            {
                Name: { $regex: req.params.key }

            },
            {
                Company: { $regex: req.params.key }
            },
            {
                Category: { $regex: req.params.key }
            },
        ]
    })
    res.send(result);
})


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
