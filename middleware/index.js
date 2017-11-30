var Campground = require("../models/campground");
var Comment = require("../models/comment");

// all the middleware goes here
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()) {
        //if yes, does user own campground, if so, let him edit
        Campground.findById(req.params.id, function(err, foundCampground){
            if (err) {
                res.redirect("back");
            }
            else {
                //foundCampground.author.id is a mongoose object
                //req.user.id is a string, so direct compare won't work
                if (foundCampground.author.id.equals(req.user._id)) {
                    next();
                }
                else {
                    res.redirect("back");
                }
                
            }
        })        
    }    
    else {
        res.redirect("back");
    }    
}

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()) {
        //if yes, does user own campground, if so, let him edit
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if (err) {
                //req.flash("error", "Campground not found");
                res.redirect("back");
            }
            else {
                //does user own the comment?
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                }
                else {
                    //req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
                
            }
        })        
    }    
    else {
        //req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }        
}

//middleware check, put in any place we want to check
middlewareObj.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    //not do flash right away, means in the flash, add "Please Login First"
    //key is "error", value is "Please login first"
    //req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
}

module.exports = middlewareObj;