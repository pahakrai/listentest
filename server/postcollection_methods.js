Meteor.methods({
  'insertPost': function(options) {
    /*-- console.log(options.content);
    var currentUserId = Meteor.userId();
    var author = Meteor.user().emails[0].address;
    if(options.parentId !== null){
      var objectid = new Mongo.ObjectID(options.parentId);
      }
    structure
    {
      _id: 123,
      userId: 123,  // receiver user id
      fromUserId: 123, // the sender
      type: // action type:  1 - reply you a comment , 2 - like your post
      refId: // reference to
      isRead:  // true = notification is read, false
      date: // notofication date
    }

    --*/
    var post = {
      content: options.content,
      date: new Date(),
      userId: Meteor.userId(),
    //author: author,
      parent: options.parentId
    };
    console.log("user id: " + Meteor.userId());
    var userCurrentId = Meteor.userId();
    var children_id = PostCollection.insert(post);

    createPostCommentNotification(post, children_id);
    //console.log(childrenid);
    //insert as children if parent is null and create a notification for post readers except the post creater
    if(options.parentId !== null)
    {
      PostCollection.update({_id: options.parentId},{ $push: { children: children_id }});
    }
    //var postowner = PostCollection.findOne({_id: options.parentId });
    //console.log("children_id.parent= " +  children_id.parent);
    //return children_id;
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
