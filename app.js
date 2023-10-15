require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

const app = express();

app.use(express.json());

app.get("/check", (req, res, next) => {
    res.status(200).json({ status: "working" });
});

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

mongoose
    .connect(MONGODB_URI)
    .then((connection) => {
        console.log(
            `Connection established with DB : ${connection.connection.name}`
        );
        app.listen(PORT, () => {
            console.log(`Server started at port: ${PORT}`);
        });
    })
    .catch((err) => console.log(err));
