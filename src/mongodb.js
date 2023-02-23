const mongoose = require("mongoose");
const databaseName = "rishidb";
const collectionName = "logins";
mongoose.connect(`mongodb://localhost:27017/${databaseName}`).then(() => {
    console.log("mongodb connected");
}).catch(() => {
    console.log("mongodb failed to connect");
});

/** a basic structure schema for login details object to be added in the database */
const loginSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true }
});

/** initializing the colletion to add values to */
const collection = new mongoose.model(collectionName, loginSchema);
// const newCollection = new mongoose.Collection()
module.exports = collection;