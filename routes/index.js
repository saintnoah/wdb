var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

router.get("/", function(req, res) {
    res.render("landing");
})

//AUTH ROUTES
router.get("/register", function(req, res) {
    res.render("register");
})
//handle sign up logic, register.ejs, method="POST"
router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err) {
            console.log(err);
            return res.render("register");
        }
        //success path, really login
        //same method as handling login logic, but here we check register success or not
        //in login logic, we assume user already exist, just do check 
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds")
        });
    });
});


//show login form
router.get("/login", function(req, res) {
    res.render("login");
});

//handlling login logic, asssuem user exist already, all we do is passport.authenticate
//app.post("/login", middleware, callback)
router.post("/login", 
    //second argument, middleware, setup using localStrategy, run first
    passport.authenticate("local", 
    {
        //if username/password success, go to campgrounds
        successRedirect: "/campgrounds",
        //if username/password is not right, go to login page again
        failureRedirect: "/login"
        
    }), 
    //callback
    function(req, res) {
    //use middleware to do login
    }
);

// logout route
router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/campgrounds");
});


//middleware check, put in any place we want to check
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;