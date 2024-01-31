require('./db_connect');
const User = require('./Schema');
const express = require('express');
const app = express();
const cors = require('cors');
const Product = require('./ProductSchema');

app.use(cors({
    origin:["https://e-dashboard-two.vercel.app"],
    method:["POST","GET","PUT","DELETE"],
    credentials:true
}));
app.use(express.json());


app.post('/signup', async (req, res) => {
    let Myuser = new User(req.body);
    let result = await Myuser.save();
    result = result.toObject();
    delete result.password;
});

app.post('/login', async (req, res) => {
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            res.send(user);
        }
        else {
            res.send({ result: 'No user Found' });
        }
    }
    else {
        res.send({ result: 'No user Found' });
    }


});

app.post('/Add', async (req, res) => {
    let NewProduct = new Product(req.body);
    let Products = await NewProduct.save();
})

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

app.listen(3000);
