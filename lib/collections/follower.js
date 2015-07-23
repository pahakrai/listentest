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

*/
