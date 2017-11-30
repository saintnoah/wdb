var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//=========================
// COMMENTS ROUTES
//=========================
//comments new
router.get("/new", middleware.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground){
        if (err) {
            console.log(err);
        }
        else {
            res.render("comments/new", {data: campground});
        }
    })

})

//comments create
router.post("/", middleware.isLoggedIn, function(req, res) {
    //lookup campground using id in DB
    Campground.findById(req.params.id, function(err, campground) {
        if(err) {
            console.log(err);
            res.redirect("/campgrounds");
        }
        else {
            //create new comment, req.body.comment is come from
            //name=comment[text]
            Comment.create(req.body.comment, function(err, comment) {
                if (err) {
                    console.log(err);
                }
                else {
                    //associate comment with campground
                    //add username and id to comment and save comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    
                    campground.comments.push(comment);
                    campground.save();
                    //redirect to show page
                    res.redirect("/campgrounds/" + campground._id)
                }
            })
        }
    })
});

//COMMENTS EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err) {
            res.redirect("back");
        }
        else {
            res.render("comments/edit", 
            {campground_id: req.params.id, comment: foundComment});
        }
    })
});

//COMMENTS UPDATE, /campgrounds/:id/comments/:comment_id
//findById req.params.comment_id, should be same as path /:comment_id
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComments){
        if(err) {
            res.redirect("back");
        }
        else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
});

//COMMENT DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    //findByIdAndRemove
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        }
        else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
});

module.exports = router;