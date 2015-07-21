Meteor.publish('settings', function() {
  var currentUserId = this.userId;

  Logger.log('info','publish setting userId='+currentUserId);

  return MemberSettingCollection.find({userId: currentUserId});
});

Meteor.publish("profilePicture", function(){
  var currentUserId = this.userId;

  Logger.log('info','publish profilePicture userId='+currentUserId);

  return MemberProfilePictureCollection.find({
      $query: {'owner': currentUserId},
      $orderby: {uploadedAt: -1}
    });
});

// remove image of owner=userId
Meteor.methods({
    'removeProfileImage': function(){
		var currentUserId = this.userId;
        var cursor = MemberProfilePictureCollection.find({$query: {'owner': currentUserId}});
		cursor.forEach(function (profileImage) {
			MemberProfilePictureCollection.remove(profileImage._id);
		})
  }

});

Meteor.publish('message', function() {
  var currentUserId = this.userId;

  Logger.log('info','publish message userId='+currentUserId);

  return MessageCollection.find({userId: currentUserId});
});



/*
Meteor.publish('chinaAStock', function(stockCode) {
  check(stockCode, String);
  return ChinaAStockCollection.find({stockCode: stockCode});
});

Meteor.publish('chinaAStock', function() {
  return ChinaAStockCollection.find();
});

*/

// instant message list
Meteor.publish('instantMessageList', function() {
  var currentUserId = this.userId;
  return InstantMessageCollection.find({userIds: currentUserId});
});

Meteor.publish('instantMessage', function(id) {
  check(id, String);

  var currentUserId = this.userId;
  var cursor = InstantMessageCollection.find({_id: id});

  // TODO check the message contains userId

  return cursor;
});

// obsoleted, use watchList instead
Meteor.publish('chinaAStock', function(stockList) {
  return ChinaAStockCollection.find({stockCode: { $in: stockList}});
});

// subscribe the stockCollection by user's watchList
Meteor.publish('watchList', function() {
	var user =  Meteor.users.findOne({_id: this.userId});
	if (user != null) {
		//var name  = user.profile.watchList;
		//var selector = {stockCode: {$in: user.profile.watchList}};

		//Logger.log('info','watchList='+name);

		var wl = [];
		if (user.profile != null) {
			wl = user.profile.watchList;
		}
		return ChinaAStockCollection.find({stockCode: {$in: wl}});
	}
});

// 2nd version: watchList by its own collection


Meteor.publish('singleStockInfo', function(stockCode) {
  check(stockCode, String);
  return StockInfoCollection.find({stockCode: stockCode});
});

// for autocomplete
Meteor.publish("autocompleteStocks", function(selector, options) {
//Logger.log('info','selector='+JSON.stringify(selector)+' options='+JSON.stringify(options));
  Autocomplete.publishCursor(ChinaAStockCollection.find(selector, options), this);
  this.ready();
});



/* example
Meteor.publish('groupUsers', function(groupId) {
  check(groupId, String);
  var group = Groups.findOne(groupId);
  var selector = {_id: {$in: group.members}};
  var options = {fields: {username: 1}};
  return Meteor.users.find(selector, options);
});
*/



/* example not to over publish http://joshowens.me/meteor-security-101/

Meteor.publish('gameAttendees', function(ids) {
  return Meteor.users.find({_id: {$in: ids}}, {fields: {'profile.pictureUrl': 1, username: 1}});
});

*/
