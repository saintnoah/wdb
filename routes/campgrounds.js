var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
//if we just give ../middleware, it will automatically look up index.js
//just magic name
var middleware = require("../middleware");

//INDEX - show all campgrounds
router.get("/", function(req, res){
    req.user
    //get all campground from DB
    Campground.find({}, function(err, items){
        if (err){
            console.log(err);
        }
        else {
            res.render("campgrounds/index", {data: items, currentUser: req.user});
        }
    });    
    //res.render("campgrounds", {data: campgrounds});
});

//CREATE - add new campground to DB
router.post("/", middleware.isLoggedIn ,function(req, res){
    //Error: Can't set headers after they are sent if we keep res.send
    //res.send("YOU HIT THE POST ROUTE");
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: name, image: image, description: desc, author:author};
    //create a new campground and save to db
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        }
        else {
            res.redirect("/campgrounds");
        }
    })
    //non-db way
    //campgrounds.push(newCampground);
    //redirect back to campgrounds page
    //res.redirect("/campgrounds");
});

//NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("campgrounds/new"); 
});

//SHOW -shows more info about one campground
router.get("/:id", function(req, res) {
    //findthe campground with provided ID
    //if we want to pass comment to show template, we need to use populate+exec
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err) {
            console.log(err);
        }
        else {
            console.log(foundCampground);
            //render show template with that background
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
    //render show template with that campground
    //res.send("THIS WILL BE THE SHOW PAGE ONE DAY");
    //res.render("show");
});

//EDIT CAMPGROUND ROUTE, we need a form to edit
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    //is user logged in at all, create a new middleware instead of isLoggedIn
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {data: foundCampground});
    });
});

//UPDATE CAMPGROUND ROUTE, form needed to be submitted to somewhere
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    //find and update the correct campground and redirect somewhere
    //group things together in edit.ejs using data[name], data[image] etc
    Campground.findByIdAndUpdate(req.params.id, req.body.data, function(err, updatedCampground){
        if(err) {
            res.redirect("/campgrounds");
        }
        else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err) {
            res.redirect("/campgrounds");
        }
        else {
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;