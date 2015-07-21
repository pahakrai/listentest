Meteor.methods({
  'insertUserPost': function(varPost) {
    var currentUserId = Meteor.userId();
    UserPosts.insert({
      post: varPost,
      post_date: new Date(),
      createdBy: currentUserId
    });
  },
  'removePost': function(selectedpost) {
    UserPosts.remove(selectedpost);
  },
  'modifyPost': function(selectedPost,newPost) {
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
  }
});
