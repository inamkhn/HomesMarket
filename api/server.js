import express from "express";
import { connect } from "./config/db.js";
import dotenv from 'dotenv'
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from 'cors'
import path from 'path';

import userRouter from './Routers/userRoute.js'
import authRouter from './Routers/authRoute.js'
import listingRouter from './Routers/listingRoute.js'


const corsOptions ={
  origin:'http://localhost:5173', 
  credentials:true,            
  "access-control-allow-Origin":true,
  optionSuccessStatus:200
}

dotenv.config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}));
dotenv.config()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors(corsOptions))

const __dirname = path.resolve();

app.use("/api/v1",userRouter)
app.use("/api/v1",authRouter)
app.use("/api/v1",listingRouter)

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(5000,(req,res)=>{
    connect()
    console.log(`server is runing on 5000`)
})