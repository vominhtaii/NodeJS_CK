import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();

app.get('/',(req,res)=>{
    res.send("Server is ready!")
})

console.log(process.env.MONGO_URI);


const port = process.env.PORT || 6789
app.listen(port,()=>{
  connectDB();
  console.log('Server started at http://localhost:' +port);
})