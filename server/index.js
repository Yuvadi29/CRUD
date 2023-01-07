const express = require('express');
const mongoose = require('mongoose');
const app = express();

require('dotenv').config();

app.use(express.json()); //Allows us to receive information from frontend

const FoodModel = require('./models/Food');

//Database Connection
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
}, () => {
    console.log('Connected To Database Successfully');
});


app.get('/', async (req, res) => {
    const food = new FoodModel({
        foodName: "Mango",
        daysSinceEaten: 4,
    })

    try {
        await food.save();
        res.send("Data Inserted");        
    } catch (error) {
        console.log(error);
    }
})

app.listen(5000, () => {
    console.log("Server Running on Port 5000");
})