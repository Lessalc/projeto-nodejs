import mongoose from "mongoose";

mongoose.connect("mongodb+srv://lucianoclessa:root@alura.5nlu6ie.mongodb.net/alura-node");

let db = mongoose.connection;

export default db