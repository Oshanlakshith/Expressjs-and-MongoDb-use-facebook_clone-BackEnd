const express=require('express')
const mongoose=require('mongoose')
const accountCreate=require('./routes/createAccount')
const app=express()
const bodyParser= require('body-parser')
const multer = require('multer');
const port=4000


app.use(express.json())

var Storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
})

var upload = multer({ storage: Storage }).array('image', 12)
console.log(upload);

//route
app.post('/', (req, res) => {
    
});

app.post('/upload', (req, res) => {
    upload(req, res , err => {
        if (err) {
            res.send('somthing went wrong');
        }
        res.send('file uploaded successfully');
    });
});


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