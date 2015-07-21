Template.profile.helpers({
    'picture': function(){
        return MemberProfilePictureCollection.findOne();
    }
});

Template.profile.events({
   'change .myFileInput': function(event, template) {
      FS.Utility.eachFile(event, function(file) {
		//check isImage
		//Done in collection, see member.js

		//image manipulation
		//TODO

    var userId = Meteor.userId();
		var fsFile = new FS.File(file);
		fsFile.owner = userId;

		//remove previous profile image, if any
		Meteor.call('removeProfileImage');

		// insert to CollectionFS
        MemberProfilePictureCollection.insert(fsFile, function (err, fileObj) {
          if (err){
             // handle error
          } else {
             // handle success depending what you need to do
            var imagesURL = {
              "profile.image": "/cfs/files/images/" + fileObj._id
            };
            Meteor.users.update(userId, {$set: imagesURL});
          }
        });
     });
	}
});
