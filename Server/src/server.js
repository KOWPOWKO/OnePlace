const express = require("express");
const fs = require("fs");
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer'); 
const cors = require('cors');
const path = require('path');
const busboy = require('busboy');

const storage = require('./routes/storage');
const upload = require('./routes/upload');

app.use(
  cors({
    origin: ["http://localhost:3000","http://192.168.1.11:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


const storageDirectorty = path.join(__dirname,'..','..','storage');
app.use(express.static(storageDirectorty));

storage.calls(app,fs,path,cors);
upload.calls(app,fs,busboy,path,storageDirectorty)

app.listen(5000, () => console.log('Server Started...'))
