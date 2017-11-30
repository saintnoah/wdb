var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Yellowstone",
        image: "https://media-cdn.tripadvisor.com/media/photo-s/01/24/c8/b8/dinner-with-a-friend.jpg",
        description: "Wow have lunch with Bison"
    }, 
    {
        name: "Alaska",
        image: "http://www.bbyopassport.org/Images/TrekAlaskacamping.aspx",
        description: "Have breakfast with Bear"
    },
    {
        name: "Yosemite",
        image: "https://www.nhstateparks.org/uploads/images/Dry-River_Campground_02.jpg",
        description: "No animal in Yosemite :("
    }
]

function seedDB(){
    //Remove all campgrounds
    Campground.remove({}, function(err){
        if (err) {
            console.log(err);
        }
        console.log("removed campgrounds!");
        
        //add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, data){
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("add a campground");
                    //create a comment on each
                    Comment.create(
                        {
                            text: "This place is greate, but no internet",
                            author: "Liang"
                        }, 
                        function(err, comment) {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                data.comments.push(comment);
                                data.save();         
                                console.log("Created new comment");
                            }
                        }
                    )
                }
            })
        });        
    });

    //add a few comments
}

module.exports = seedDB;