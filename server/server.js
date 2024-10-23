const express = require ("express")
const connectDb = require("./config/dbConnection")
const errorHandler = require("./middleware/errorHandler")
const cors = require("cors")

// env file config
const dotenv = require("dotenv")
dotenv.config()

connectDb()
const app = express()
const port = process.env.port || 5000 ;

app.use(express.json())
app.use(cors())


app.get("/", (req,res)=>{
    res.send("working");
})

app.get('/home',(req,res)=>{
    res.render('home',{
        username: "xyz",
        posts: "flana dhimkana"
    })
})

app.get('/allusers',(req,res)=>{
    res.render('allusers',{
        data:[{name:"abc", age:20},
            {name:"def", age:19}]
    })
})

app.use(errorHandler)

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})