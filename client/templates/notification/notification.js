 Template.notifications.helpers({
  notifications: function() {
    return NotificationCollection.find({toUserId: Meteor.userId(), isRead: false});
  },
  notificationCount: function(){
      return NotificationCollection.find({toUserId: Meteor.userId(), isRead: false}).count();
  }
});

Template.notificationItem.helpers({
  notificationPostPath: function() {
    return Router.routes.postPage.path({_id: this.postId});
  }
});

Template.notificationItem.events({
  'click a.link': function() {
    Meteor.call('updateNotification',this._id);
  }
});
