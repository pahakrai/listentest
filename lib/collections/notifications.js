NotificationCollection = new Mongo.Collection("notification");
Followers = new Mongo.Collection("followers");

/*-- structure
{
	_id: 123,
	userId: 123,  // receiver user id
	fromUserId: 123, // the sender
	type: // action type:  1 - reply you a comment , 2 - like your post
	refId: // reference to action type
  isRead:  // true = notification is read, false
	date: // notofication date
}

*/

createPostCommentNotification = function(post, children_id) {
  var postowner = PostCollection.findOne({_id: post.parent });
	if (postowner.userId !== post.userId) {
		var followObj = Followers.findOne({userId: post.userId});
	  _.each(followObj.followedBy, function(id) {
			// base on this follower id, create a notification

				NotificationCollection.insert({
		      toUserId : id,
		      fromUserId: post.userId,
					//type: Comments,
					//referenceId : [postId,commentId],
		      postId: post.parent,
		      commentId: children_id,
		      date: new Date(),
		      isRead: false
		    });
			});
	}
}

  /* --
    NotificationCollection.insert({
      toUserId : postowner.userId,
      fromUserId: post.userId,
			//type: Comments,
			//referenceId : [postId,commentId],
      postId: post.parent,
      commentId: children_id,
      date: new Date(),
      isRead: false
    });
	}; --*/
