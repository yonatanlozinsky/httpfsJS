const express = require('express');
const path = require('path');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const multerGridFS = require('multer-gridfs-storage');
const session = require('express-session');
const gridFsStream = require('gridfs-stream');
const methodOverride = require ('method-override');
const expressValidator = require('express-validator');
const passport = require('passport');

let gfs;

const mongoURI = "mongodb://localhost:27017/fileDB";
mongoose.createConnection(mongoURI)
.then((conn)=>{
    gfs = gridFsStream(conn.db, mongoose.mongo);
    gfs.collection('uploads');
    console.log("Made connection to mongo!");
});

////



const storage = new multerGridFS({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads',
          metadata:{
              uploaderId: req.user._id
        }};
        resolve(fileInfo);
        });
    });
}});

    //
const upload = multer({ storage });


////


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(methodOverride("_method"));





app.set('view engine', 'ejs');

//session
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
  }));
//

//error validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;
  
      while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param : formParam,
        msg   : msg,
        value : value
      };
    }
  }));


//passport

app.use(passport.initialize());
app.use(passport.session());
require('./config').passport(passport);

//routes

//user-session route
app.get("*", (request, response, next)=>{
    response.locals.user = request.user || null;
    console.log("USER");
    console.log(request.user);
    console.log("enduser");
    next();
})

const usersRoute = require('./routes/users');
app.use('/users', usersRoute);

//index get
app.get('/', (request, response)=>{
    gfs.files.find().toArray((err, files)=>{

        if (!files || files.length===0){
            response.render('index', {files:false});
        }
        else{
            response.render('index', {files:files});

        }
    })
    //response.render('index');
})

//upload file
app.post('/upload', upload.single('upload'),(request, response)=>{
    response.json({file:request.file});

});

//get files

app.get('/files', (request,response)=>{
    gfs.files.find().toArray((err,files)=>{
        console.log(files);
        if (!files || files.length===0){
            return response.status(404).json({
                err:"No files exist"}
            );
            }
        else
        {return response.json(files);}
    
})});


//get specific files

app.get('/files/:filename', (request,response)=>{
    gfs.files.findOne({filename:request.params.filename}, (err,file)=>{
        if (!file || file.length===0){
            return response.status(404).json({
                err:"File doesn't exist"}
            );
            }
        else
        {return response.json(file);}

    })});


//delete file

app.delete('/files/:id', (request, response)=>{
    gfs.remove({_id: request.params.id, root: 'uploads'}, (err, gridStore)=>{
        if (err){
            return response.status(404).json({err:err});
        }

        response.redirect('/');
    });
})


const port=80;

app.listen(port, () => console.log(`Server started on ${port}!`));
