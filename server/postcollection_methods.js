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
    //insert as children if parent is null and create a notification for post readers except the post creater
    if(options.parentId !== null)
    {
      createPostCommentNotification(post);
      PostCollection.update({ _id: options.parentId},{ $push: { children: children_id }});
    }

    // create the comment, save the id
    //post._id = PostCollection.insert(post);
    // now create a notification, informing the user that there's been a comment
  //  createPostCommentNotification(post);
  //  return post._id;

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

/*Notifications.allow({
  update: function(userId, doc, fieldNames) {
    return ownsDocument(userId, doc) &&
      fieldNames.length === 1 && fieldNames[0] === 'read';
  }
});

createPostCommentNotification = function(comment) {
  var post = Posts.findOne(comment.postId);
  if (comment.userId !== post.userId) {
    NotificationCollection.insert({
      userId: post.userId,
      postId: post._id,
      commentId: comment._id,
      commenterName: comment.author,
      isRead: false
    });
  }
};*/

/* structure
{
	_id: 123,
	userId: 123,  // receiver user id
	fromUserId: 123, // the sender
	type: // action type:  1 - reply you a comment , 2 - like your post
	refId: // reference to
  isRead:  // true = notification is read, false
	date: // notofication date
}

*/


/* Template.notifications.helpers({
  notifications: function() {
    return Notifications.find({userId: Meteor.userId(), read: false});
  },
  notificationCount: function(){
      return Notifications.find({userId: Meteor.userId(), read: false}).count();
  }
});

Template.notificationItem.helpers({
  notificationPostPath: function() {
    return Router.routes.postPage.path({_id: this.postId});
  }
});

Template.notificationItem.events({
  'click a': function() {
    Notifications.update(this._id, {$set: {read: true}});
  }
}); */
