

Meteor.publish('userposts', function(options) {
  //var currentUserId = this.userId;
  //return UserPosts.find({createdBy : currentUserId},options);

    //var currentUserId = this.userId;
    //return UserPosts.find({createdBy : currentUserId},options);
    return UserPosts.find({});

});

Meteor.publish('postpage', function(){
  //var currentUserId = this.userId;
  return UserPosts.find({});
});

/*--Meteor.publish('userposts', function(limit) {
  if (limit > UserPosts.find().count()) {
    limit = 0;
  }--*/
  //check(options, {
    //sort: Object,
  //  limit: Number
  //});
  //var currentUserId = this.userId;
  //return UserPosts.find({}, {limit:limit});
//});


Meteor.publish('postcomments', function(){
  return Comments.find({});
});
