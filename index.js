const express=require("express");
const dbConnect=require("./config/database");
const route=require("./routes/route");
const cookieParser=require("cookie-parser");
const app=express();
// const cors = require('cors');
const cors = require('cors');

app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  credentials: true, // Allow cookies
}));

//app.use(cors(corsOptions));

app.use(express.json()); 


require("dotenv").config();

app.use("/api/v1",route);

const PORT=process.env.PORT||3000;


dbConnect();


app.listen(PORT,(req,res)=>{
    console.log(`server is running on PORT ${PORT}`);
})


