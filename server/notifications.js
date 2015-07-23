
/* Meteor.publish('notifications', function() {
  return NotificationCollection.find();
}); */

Meteor.publish('notifications', function() {
  return Notifications.find({userId: this.userId, read: false});
});
