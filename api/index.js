import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Connected to mongodb");
})
.catch((err)=>{
    console.log(err)
})
const app = express();
app.use(express.json());     //this will allow json as a input for the server

app.listen(3000,()=>{
    console.log('server is running on port 3000!!');
})

app.use("/api/user",userRouter);
app.use("/api/auth",authRouter);




// Middleware to handle internal sever error
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    })
})
