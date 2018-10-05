const express = require('express');
const bcrypt = require('bcryptJS');
const passport = require('passport');
const User = require ('../models/user');
const router = express.Router();


//sign-up page
router.get('/signup',(request, response)=>{
    response.render('signup');
});

//signup request
router.post('/signup',(request,response)=>{
    const username = request.body.username;
    const password = request.body.password;
    const password2 = request.body.password2;
    const email = request.body.email;

    //check if valid input

    request.checkBody('username', 'Username is a required field!').notEmpty();
    request.checkBody('password', 'Password is a required field!').notEmpty();
    request.checkBody('password2', 'Password confirmation is a required field!').notEmpty();
    request.checkBody('email', 'Make sure that your email is valid!').isEmail();
    request.checkBody('password2','Passwords do not match!').equals(password);


    let errors = request.validationErrors();

    let newUser;
    
    if (errors){
        console.log(errors);
        response.render('signup',{
            errors:errors
        });
    } else {
        newUser = new User({
            username:username,
            email:email,
            password:password

        });

        console.log("Created new user!")
        console.log(newUser);

        bcrypt.genSalt(8, (err, salt)=>{
            bcrypt.hash(newUser.password, salt).then(result=>{
                newUser.password = result;
                console.log(newUser.password);

                newUser.save((err)=>{
                    if (err){
                        console.log("ERRR!");
                        console.log(err);
                        response.json({error:err});
                    }
                    else{
                        response.json("REGISTERED");
                    }
                });
            });
        })
    }

});


//log-in page
router.get('/login', (request,response)=>{
    response.render('login');
});

//log-in form
router.post('/login', (request, response, next)=>{
    passport.authenticate('local',{

        successRedirect:'/',
        failureRedirect:'/users/login',

    })(request, response, next)


});

//logout

router.get('/logout', (req, res, next)=> {
    if (req.session) {
      // delete session object
      req.session.destroy(err => {
        if(err) {
          return next(err);
        } else {
          return res.redirect('/');
        }
      });
    }
  });


module.exports = router;
