import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
// regular middlewares
app.use(express.json());

// database connection
import connectDatabase from "./config/db.js";
connectDatabase();

// routes
import userRouter from './routes/UserRouter.js'
import taskRouter from './routes/TaskRouter.js'
app.use("/api/v1/user", userRouter);
app.use("/api/v1/task", taskRouter);

// port assignment
const PORT = process.env.PORT || 4000;

app.listen(PORT, (err) => {
    if(err) console.log(err);
    else console.log(`Server is running on PORT ${PORT}`);
})