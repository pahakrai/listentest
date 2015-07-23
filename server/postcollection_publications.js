Meteor.publish('postcollections', function(opt) {
  /*-- var observeCallbacks = {
    addedAt: function (doc, index) {
      var user = Meteor.users.findOne({_id: doc.userId});
      doc.update({author: user.emails[0]});
    },
  };--*/

  var sub = this, postHandle = null;

  postHandle = PostCollection.find({userId : opt}).observeChanges({
   added: function(id, post) {
     //publishPostComments(id, post.userId);
     // push the author field into the Post data
     var user = Meteor.users.findOne({_id: post.userId});
     _.extend(post, {author: user.emails[0].address});

     sub.added('message', id, post);
     //console.log('id='+id+' JSON='+JSON.stringify(post));
   },
   changed: function(id, fields) {
     sub.changed('message', id, fields);
   },
   removed: function(id) {
     // delete the post
     sub.removed('message', id);
   }
  });

 sub.ready();
 // make sure we clean everything up (note `_publishCursor`
 //   does this for us with the comment observers)
 sub.onStop(function() { postHandle.stop(); });

});

Meteor.publish('comments', function(opt) {
  console.log(opt+'postcollection length='+PostCollection.find({parent: opt}).length);
  return PostCollection.find({parent : opt});
});
