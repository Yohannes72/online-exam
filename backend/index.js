// index.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes.js";


const PORT = 5555;
const mongodbURL = 'mongodb+srv://yohannes:abi12345678@taskmanagement.adv2van.mongodb.net/';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Welcome to the server');
});
app.use('/tasks', taskRoutes);

mongoose.connect(mongodbURL)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server started at ${PORT}`);
        });
        console.log('MongoDB connected successfully');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
