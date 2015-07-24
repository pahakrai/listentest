
 Meteor.publish('notifications', function() {
  return NotificationCollection.find();
});

/*-- Meteor.publish('notifications', function() {
  return Notifications.find({userId: this.userId, read: false});
}); --*/
Meteor.methods({

  'updateNotification': function(id) {
    NotificationCollection.update({_id: id},{$set: {isRead: true}});
  },
});
