import express from "express";
import { connect } from "./config/db.js";
import dotenv from 'dotenv'
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from 'cors'

import userRouter from './Routers/userRoute.js'
import authRouter from './Routers/authRoute.js'
import listingRouter from './Routers/listingRoute.js'

dotenv.config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}));
dotenv.config()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors())

app.get('/',(req,res)=>{
    res.send("hello")
})

app.use("/api/v1",userRouter)
app.use("/api/v1",authRouter)
app.use("/api/v1",listingRouter)

app.listen(5000,(req,res)=>{
    connect()
    console.log(`server is runing on 5000`)
})