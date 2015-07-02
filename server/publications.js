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

Meteor.publish('chinaAStock', function(stockList) {
  return ChinaAStockCollection.find({stockCode: { $in: stockList}});
});

Meteor.publish('singleStockInfo', function(stockCode) {
  check(stockCode, String);
  return StockInfoCollection.find({stockCode: stockCode});
});






