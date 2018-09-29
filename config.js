const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptJS');

module.exports.passport = passport=>{
        const User = require('./userAPI');

        passport.use(new LocalStrategy((username, password, done)=>{
            let query = {username:username};

            User.findOne(query)
            .then(user=>{
                console.log(username);
                bcrypt.compare(password, user.password)
                .then(result=>{console.log(result);
                return done(null,user);
            })
                .catch(err=>{console.log(err);
                return done(null, false, {message:"Password didn't match!", error:err})});
            })
            .catch(err=>{
                console.log(err);
                return done(null, false, {message:"No user found", error:err});
            })
        }));

        passport.serializeUser(function(user, done) {
            done(null, user.id);
          });
          
          passport.deserializeUser(function(id, done) {
            User.findById(id, function(err, user) {
              done(err, user);
            });
          });
    };
module.exports.database = "mongodb://localhost:27017/fileDB";

    