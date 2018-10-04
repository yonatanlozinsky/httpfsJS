const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').JWTStrategy; //add jwt later
const Strategy = require('passport-jwt').Strategy;



const bcrypt = require('bcryptJS');

module.exports.passport = passport=>{
        const User = require('./models/user');

        passport.use(new LocalStrategy((username, password, done)=>{
            let query = {username:username};

            User.findOne(query)
            .then(user=>{
                console.log(username);
                bcrypt.compare(password, user.password)
                .then(result=>{console.log(result);
                return done(null, user);
            })
                .catch(err=>{console.log(err);
                return done(null, false, {message:"Password didn't match!", error:err})});
            })
            .catch(err=>{
                console.log(err);
                return done(null, false, {message:"No user found", error:err});
            })
        }));

        passport.serializeUser((user, done) => {
            done(null, user.id);
          });
          
          passport.deserializeUser((id, done) => {
            User.findById(id, (err, user)=> {
              done(err, user);
            });
          });
    };
module.exports.database = "mongodb://localhost:27017/fileDB";

    