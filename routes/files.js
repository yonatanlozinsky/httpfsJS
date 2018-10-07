const express = require('express');
const ObjectId = require('mongodb').ObjectID
const multer = require('multer');
const crypto = require('crypto');
const multerGridFS = require('multer-gridfs-storage');
const gridFsStream = require('gridfs-stream');
const mongoose = require('mongoose');
const path = require('path');
const jwt = require('jsonwebtoken');
const router = express.Router();


//CONFIGURATIONS AND DEFINITIONS

const handleExpire = (request, response) =>{
    try{
        let realToken = parseToken(request.headers.authorization);
        return realToken;
        }
    
        catch(err){
            if (err.name === "TokenExpiredError"){ //handle expire
                
                response.status(401).json({errors:"Token expired"});
    
            }

            else if (err.name === "TypeError"){ //handle expire
                
                response.status(401).json({errors:"No token"});
    
            }

            else{

                response.status(401).json({errors:"Something went wrong.."});

            }
            console.log(err);
        return '';
        }
}

const parseToken = token=>{
    
    return jwt.verify(token.replace(/^JWT\s/,''), 'hash_coming_soon');

}

let gfs;
//connect and defile gridfsstream object
const mongoURI = require('../config').database;
mongoose.createConnection(mongoURI, {useNewUrlParser:true})
.then((conn)=>{
    gfs = gridFsStream(conn.db, mongoose.mongo);
    gfs.collection('uploads');
    console.log("Made connection to mongo!");
});


//define storage
const storage = new multerGridFS({
    url: mongoURI,
    file: (req, file) => {
        console.log("[Req headers]",req.headers);

        console.log("[File]",file);
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          console.log("[Filename]:",filename)
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads',
            metadata:{
                uploaderId: handleExpire(req.headers.authorization)._id,
                uploadDescription: req.headers.uploaddescription
          }};
          resolve(fileInfo);
          });
      });
  }});



//// define multer
const upload = multer({ storage });



//REAL ROUTES


//upload file
router.post('/upload', upload.any(),(request, response)=>{
    console.log("[Upload post request body]", request.headers, request.body);  

    if (handleExpire(request, response)){
        response.json({msg:"success"});
    }
    
    


});

//get files

router.get('/all' ,(request,response)=>{
    if (handleExpire(request,response)){
    gfs.files.find({"metadata":{"uploaderId":handleExpire(request.headers.authorization)._id}}).toArray((err,files)=>{
        console.log(files);
        if (!files || files.length===0){
            return response.status(404).json({
                err:"No files exist"}
            );
            }
        else
        {
            return response.json(files);
        }
    
    })}});

//file downloader
router.get('/download/:id',(req, res) => {
    gfs.collection('uploads'); //set collection name to lookup into

    /** First check if file exists */
    let fileId = req.params.id;
    
    gfs.files.find({_id: new ObjectId(fileId)}).toArray((err, files)=>{
        console.log(files.length);
        if(!files || files.length === 0){
            return res.status(404).json({
                responseCode: 1,
                responseMessage: "file not found"
            });
        }
        // create read stream
        let readstream = gfs.createReadStream({
            filename: files[0].filename,
            root: "uploads"
        });
        // set the proper content type
        res.set('Content-Type', files[0].contentType)
        res.set('Content-Disposition', 'attachment; filename="' + files[0].filename + '"');

        // return response
        return readstream.pipe(res);
    });
});


//get specific file json

router.get('/get/:id', (request,response)=>{
    gfs.files.findOne({_id:new ObjectId(request.params.id)}, (err,file)=>{
        if (!file || file.length===0){
            return response.status(404).json({
                err:"File doesn't exist"}
            );
            }
        else
        {return response.json(file);}

    })});


//delete file

router.delete('/files/:id', (request, response)=>{
    gfs.remove({_id: request.params.id, root: 'uploads'}, (err, gridStore)=>{
        if (err){
            return response.status(404).json({err:err});
        }

        response.redirect('/');
    });
})


module.exports = router;