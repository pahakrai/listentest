/*
Template.watchList.created = function () {
  this.autorun(function () {
 
	var user =  Meteor.user();
	if (user != null) {

		// load stockCollection base on user profile's watchList
		var wl = [];
		if (user.profile != null && user.profile.watchList != null) {
			wl = user.profile.watchList;
		}
		
		this.subscription = Meteor.subscribe('chinaAStock', wl);
	}

 
 
  }.bind(this));
};

Template.watchList.rendered = function () {
  this.autorun(function () {
    if (this.subscription != null && !this.subscription.ready()) {
      IonLoading.show();
    } else {
      IonLoading.hide();
    }
  }.bind(this));
};

Template.watchList.helpers({
  'list': function(){
    return ChinaAStockCollection.find();
  }
});
*/