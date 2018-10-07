const express = require('express');
const bcrypt = require('bcryptJS');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require ('../models/user');
const router = express.Router();


//sign-up page
router.get('/signup',(request, response)=>{
    response.render('signup');
});

//signup request
router.post('/signup',async (request,response)=>{
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

    if (errors){ //validation errors?
        console.log(errors);
        response.json({
            errors:errors
        });

   
    }

    let newUser;
    console.log("[Validation Errors]",errors)
    if (!errors){ //if there were no validation errors (mainly syntax). Prevents duplicate responses.
    await User.find({username:username}).then(result=>{

        if (result.length>0){
            response.json({
                errors:"Username taken"
            });
        errors="Username taken";
    }
    })
    .catch(err=>{
        response.json({errors:err});
        errors=err;
    })
    console.log("[Catch After Username Errors]",errors)

    if (!errors){
    await User.find({email:email}).then(result=>{
        if (result.length>0){
            response.json({errors:"Email address taken"});
        errors="Email address taken";
    }
    })
    .catch(err=>{
        response.json({errors:err})
        errors=err;
    });
    }
    console.log("[Catch After Email Errors]",errors)


    if (!errors) {

        console.log("[Entered new users error]",errors)

        newUser = new User({
            username:username,
            email:email,
            password:password

        });

        console.log("Created new user!");
        console.log(newUser);

        await bcrypt.genSalt(8, (err, salt)=>{
            bcrypt.hash(newUser.password, salt).then(result=>{
                newUser.password = result;

                newUser.save((err)=>{
                    if (err){
                        console.log(err);
                        response.json({error:err});
                    }
                    else{
                        response.json({msg:"Success - user created!"})
                                        }
                });
            });
        })
    }

}});


//log-in page
router.get('/login', (request,response)=>{
    response.render('login', {user:false});
});

//log-in form
// router.post('/login', (request, response, next)=>{
//     passport.authenticate('jwt',{

//         successRedirect:'/',
//         failureRedirect:'/users/login',

//     })(request, response, next)

// });

<<<<<<< HEAD
router.post('/login', (req, res, next) => {

    passport.authenticate('local', {session: false}, async (err, user, info) => {
        console.log("user",user);
        console.log(err);
        if (err || !user) {
            return res.status(401).json({
                message: info ? info.message : 'Login failed',
                user: user
            });
        }

        await req.login(user, {session: false}, (err) => {
            if (err) {
                console.log("[Err]", err)
                res.status(401).send(err);
            }
            else{
                console.log("[User in await]",user);
            const token = jwt.sign(user.toJSON(), 'hash_coming_soon',{expiresIn:3000});

            return res.status(200).json({user, token});
            }
        });
    })
    (req, res, next);

=======
>>>>>>> 820d68e569da5d3e28fe67a8c5bd6e62f38283fe
});

//logout

<<<<<<< HEAD
router.get('/logout', (req, res, next) => {
=======
router.get('/logout', (req, res, next)=> {
>>>>>>> 820d68e569da5d3e28fe67a8c5bd6e62f38283fe
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
