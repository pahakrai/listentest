/*
Template.instantMessageList.created = function () {
  this.autorun(function () {

	this.subscription = Meteor.subscribe('instantMessageList');
  }.bind(this));
};

Template.instantMessageList.rendered = function () {
  this.autorun(function () {
    if (!this.subscription.ready()) {
      IonLoading.show();
    } else {
      IonLoading.hide();
    }
  }.bind(this));
};

Template.instantMessageList.helpers({
  'list': function(){
    return InstantMessageCollection.find();
  }
});
*/

