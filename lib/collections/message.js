// -------------- Member Setting
MessageCollection = new Mongo.Collection("message");

// MessageCollection.createIndex( {parent: 1});

/* structure 

{
	_id: 123,
	userId: 123,
	content: "testing",
	parent: 123,
	children: [123, 123]

}

*/