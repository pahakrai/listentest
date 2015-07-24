// -------------- Member Setting
FollowerCollection = new Mongo.Collection("follower");

// MessageCollection.createIndex( {parent: 1});

/* structure

{
	_id: 123,
	fromId: 123,  // follower id
	toId: 123, // followee id
	date: // date of follow
}

{
	_id: 123,
	userId:  123 // owner id
	followTo: []  // a list of users the owner is following to
	followBy: []  // a list of followers user Ids
	date: // date of follow
}


*/
