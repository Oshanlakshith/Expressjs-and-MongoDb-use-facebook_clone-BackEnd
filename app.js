const express=require('express')
const mongoose=require('mongoose')
const accountCreate=require('./routes/createAccount')
const app=express()
const port=4000


app.use(express.json())

const url='mongodb://localhost/fbclone'
mongoose.connect(url,{useNewUrlParser:true})
const con=mongoose.connection

con.on("open",()=>{
    console.log("Mongodb Connected");

})
app.use('/account',accountCreate)

app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}`)
})