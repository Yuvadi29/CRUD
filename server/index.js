const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

require('dotenv').config();

app.use(cors());

app.use(express.json()); //Allows us to receive information from frontend

const FoodModel = require('./models/Food');

//Database Connection
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
}, () => {
    console.log('Connected To Database Successfully');
});


app.post('/add', async (req, res) => {

    //Grab the Data from the frontend
    const foodName = req.body.foodName;
    const daysSinceEaten = req.body.daysSinceEaten;

    const food = new FoodModel({
        foodName: foodName,
        daysSinceEaten: daysSinceEaten,
    })

    try {
        await food.save();
        res.send("Data Inserted");
    } catch (error) {
        console.log(error);
    }
});

//Display Data
app.get('/display', async(req, res) => {
    //{} use karne se sara data aayega. Particular data chahiye toh use $where { foodName} aise kuch
    FoodModel.find({}, (err, result) => {
        if(err) {
            res.send(err);
        }
        res.send(result);
    })
})

app.listen(5000, () => {
    console.log("Server Running on Port 5000");
})