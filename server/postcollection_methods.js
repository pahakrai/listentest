Meteor.methods({
  'insertPost': function(options) {
    console.log(options.content);
    //if(options.parentId !== null){
    //  var objectid = new Mongo.ObjectID(options.parentId);
  //  }
    var post = {
      content: options.content,
      date: new Date(),
      userId: Meteor.userId(),
      parent: options.parentId
    };
    var childrenid = PostCollection.insert(post);
    console.log(childrenid);
    PostCollection.update({ _id: options.parentId},{ $push: { children: childrenid }});
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
