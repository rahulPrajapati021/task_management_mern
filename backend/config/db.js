import mongoose from "mongoose";
const connectDatabase = async () => {
    mongoose.connect(process.env.DB_URI)
    .then(() => console.log("Database connected successfully"))
    .catch(err => console.log("Error connecting database " + err));
}

export default connectDatabase;