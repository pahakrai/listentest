Meteor.publish('postcollections', function(opt) {

    return PostCollection.find({userId : opt});

});
