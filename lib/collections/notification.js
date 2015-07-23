// -------------- Member Setting
NotificationCollection = new Mongo.Collection("notification");

// MessageCollection.createIndex( {parent: 1});

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
