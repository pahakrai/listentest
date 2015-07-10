InstantMessageCollection = new Mongo.Collection("instantMessage");

// MessageCollection.createIndex( {parent: 1});

/* structure 

{
	_id: 123,
	userIds: [123, 123] 
	messages: [{
		userId: 123 // sender
		content: 'testing'
		createDate: date
	}],
	lastUpdateDate: date // date of the last message
	
}

*/

// TODO deny rules setup


Meteor.methods({
  instantMessageInsert: function(attributes) {
    check(this.userId, String);
    check(attributes, {
	  id: String,
      content: String
    });
    var user = Meteor.user();
	
	// make sure the message exists search by id and userid
    //var message = InstantMessageCollection.findOne(attributes.id);
    var message = InstantMessageCollection.findOne({_id: attributes.id, userIds: user._id});	

    if (!message)
      throw new Meteor.Error('invalid-instant-message', 'cannot find the instant message');
	
	
	var d = new Date();
    var doc = _.extend(attributes, {
      userId: user._id,
      createDate: d
    });
	// remove id field
	doc = _.omit(doc, 'id');
	
    
	// insert new message and update the lastUPdateDate field
	return InstantMessageCollection.update({_id:attributes.id}, {$push:{"messages": doc}, $set: {"lastUpdateDate": d.toJSON()}});	
  }
});

