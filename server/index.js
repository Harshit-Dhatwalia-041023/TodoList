if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const port = 3000;

const path = require("path");
const cors = require("cors");
const router = require("./router/router.js")
const methooverride = require("method-override");

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methooverride("_method"));
app.use(express.static(path.join(__dirname,"dist")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

main()
.then(()=>{console.log("User successfully connected with database")})
.catch((err)=>{
    console.log("Error during connecting the database",err)
});

async function main() {
    await mongoose.connect(process.env.MONGOURL);
} 
app.use(cors({
    origin:[
    "http://localhost:5173",
    "http://localhost:3000"
    ]
}));


app.use("/todos",router);
app.use((req, res) => {
  res.status(404).json({ error: "Page not found!" });
});
app.use((err,req,res,next)=>{
    let {status=500,msg="Internal server error!"} = err;
    res.status(status).send(msg);
})
app.listen(port,()=>{
    console.log(`Sever is listening to port : ${port}`);
})