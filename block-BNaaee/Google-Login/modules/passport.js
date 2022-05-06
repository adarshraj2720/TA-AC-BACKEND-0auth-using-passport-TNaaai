
var passport = require('passport');

var GoogleStrategy = require('passport-google-oauth20').Strategy;

// var GoogleStrategy = require('passport-google').Strategy;
var User = require('../modals/user')

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret:process.env.CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },(accessToken, refreshToken ,profile, done)=>{
      console.log(profile);
      var profileData ={
          name :profile._json.name,
          username : profile._json.name,
          email :profile._json.email,
          photo : profile._json.picture
      }
User.findOne({email: profile._json.email},(err,user)=>{
    if(err) return done(err);
    if(!user){
        User.create(profileData,(err,addeduser)=>{
            if(err) return done(err)
            return done(null,addeduser)
        })
    }
done(null,user)
})

  }))



  passport.serializeUser((user,done)=>{
      done(null, user.id);
  })


  passport.deserializeUser(function(id,done){
      User.findById(id,"name email username",function(err,user){
          done(err,user)
      })
  })

 