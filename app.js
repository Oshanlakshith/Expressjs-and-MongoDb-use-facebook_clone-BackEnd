const express=require('express')
const mongoose=require('mongoose')
const accountCreate=require('./routes/createAccount')
const app=express()
const bodyParser= require('body-parser')
const multer = require('multer');
const port=4000
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.json())

var Storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+".jpg")
    }
})

var upload = multer({ storage: Storage }).array('image', 12)
console.log(upload);

app.post('/upload',(req, res) => {
    upload(req, res , err => {
        try {
            const response=upload.save()
            res.json(response)
        } catch (error) {
            res.send(error)
        }
    });
});

app.get('/upload',async(req,res)=>{
   try {
    const image=await upload.find()
    res.json(image)
   } catch (error) {
    res.send("Err"+error)
   }
})

const { MongoClient, ServerApiVersion } = require('mongodb');
const url = "mongodb+srv://facebookClone:00cjz1rZGpjc8Dct@cluster0.zglor4l.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

//const url='mongodb://localhost/fbclone'
mongoose.connect(url,{useNewUrlParser:true})
const con=mongoose.connection

con.on("open",()=>{
    console.log("Mongodb Connected");

})
app.use('/account',accountCreate)


app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}`)
})