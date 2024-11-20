import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();

app.get('/',(req,res)=>{
    res.send("Server is ready!")
})


const PORT = process.env.PORT || 6789
app.listen(PORT,()=>{
  connectDB();
  console.log('Server started at http://localhost:' +PORT);
});