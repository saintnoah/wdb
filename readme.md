##User + Comments
* Associate users and comments
* Save author's name to a comment automatically


##Users + Campgrounds
* Prevent an unauthenticated user from creating a campground
* Save username+id to newly created campground


##Editing Campgrounds
* Add Method-Override
* Add Edit Route for Campgrounds
* Add Link to Edit Page
* Add Update Route
* Fix $set problem


#Authorization
* User can only edit his/her campgrounds
* User can only delete his/her campgrounds
* Hide/Show edit and delete buttons

#Editing Comments
* Add Edit route for comment
* Add Edit button
* Add Update route

<!--/campgrounds/:id/edit-->
<!--/campgrounds/:id/comments/:id/edit-->

#Deleting Comments
* Add Destroy route
* Add Delete button

<!--Campground Destroy Route: /campgrounds/:id-->
<!--Comment Destroy Route:    /campgrounds/:id/comments/:comment_id-->

#Authorization Part 2: Comments
* User can only edit his/her comments
* User can only delete his/her comments
* Hide/Show edit and delete buttons
* Refactor Middleware
