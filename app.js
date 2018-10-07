const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const methodOverride = require ('method-override');
const expressValidator = require('express-validator');
const passport = require('passport');
const cors = require('cors');


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(methodOverride("_method")); //for the "delete" post request in files



app.use(express.static(path.join(__dirname, '/public')));

app.set('view engine', 'ejs');

//session
app.use(session({
    secret: 'yolozinsky',
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


//passport init
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
require('./config').passport(passport); //set passport from config

//routes

//user-session route
// app.get("*", (request, response, next)=>{
//     console.log(request.user);
//     response.locals.user = request.user || null;
//     console.log("USER");
//     console.log(request.user);
//     console.log("enduser");

//    next();

// });


//users route
const usersRoute = require('./routes/users');
app.use('/users', usersRoute);

//files route
const filesRoute = require('./routes/files')
app.use('/files', filesRoute);


//index get
app.get('/', (request, response)=>{
    response.render('index', {files:false});

});

//get statics



const port=80;

app.listen(port, () => console.log(`Server started on ${port}!`));
