Meteor.methods({
  'insertPost': function(options) {
    console.log(options.content);
    var currentUserId = Meteor.userId();
    //var author = Meteor.user().emails[0].address;
    //if(options.parentId !== null){
    //  var objectid = new Mongo.ObjectID(options.parentId);
  //  }
    var post = {
      content: options.content,
      date: new Date(),
      userId: Meteor.userId(),
    //author: author,
      parent: options.parentId
    };
    var children_id = PostCollection.insert(post);
    //console.log(childrenid);
    if(options.parentId !== null)
    {
      PostCollection.update({ _id: options.parentId},{ $push: { children: children_id }});
    }

    // create the comment, save the id
    //post._id = Comments.insert(comment);
    // now create a notification, informing the user that there's been a comment
  //  createPostCommentNotification(post);
  //  return comment._id;

    /*
    find out userId's followers from the FollowCollection
    for each follower, create a notification
    */

  },
  'deletePost': function(selectedpost) {
    PostCollection.remove(selectedpost);
  },
  /*--'modifyPost': function(selectedPost,newPost) {
    UserPosts.update({_id: selectedPost},{$set: {post: newPost}});
  },
  'insertUserComment': function(comment,postid){
    var currentUserId = Meteor.userId();
    var author = Meteor.user().emails[0].address;
    console.log(author);
    Comments.insert({
     postId : postid,
     userId : currentUserId,
     author: author,
     submitted: new Date(),
     body: comment
    });
  }--*/
});
