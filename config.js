const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy; //add jwt later
const ExtractJWT = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcryptJS');

module.exports.passport = passport=>{
        const User = require('./models/user');

        passport.use(new LocalStrategy((username, password, done)=>{
            let query = {username:username};

            User.findOne(query)
            .then(user=>{
                if (!user){ //if there is no such user
                    return done(null, false, {message:"No user with this username!"});
                }
                bcrypt.compare(password, user.password)
                .then(result=>{console.log("Success",result)
                if (result){ //password matched
                    return done(null,user)}

                else{
                    return done(null, false, {message:"Password didn't match!"});

                }
            })
                .catch(err=>{console.log("err",err)
                return done(null, false, {message:"Password didn't match!", error:err})});
            })
                .catch(err=>{console.log("ERR!",err)
                return done(null, false, {message:"Something went wrong", error:err});})
            
            .catch(err=>{
                return done(null, false, {message:"Something went wrong!", error:err})})}))
        

        passport.serializeUser((user, done) => {
            done(null, user.id);
          });
          
          passport.deserializeUser((id, done) => {
            User.findById(id, (err, user)=> {
              done(err, user);
            });
          });

        passport.use(new JWTStrategy({
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey   : 'hash_coming_soon'
        },
        (jwtPayload, cb) =>{
            console.log("[jwtpayload]",jwtPayload);
            return User.findById(jwtPayload._id)
                .then(user => {
                    return cb(null, user);
                })
                .catch(err => {
                    return cb(err);
                });
        }
    ));

       
    };
module.exports.database = "mongodb://localhost:27017/fileDB";

    