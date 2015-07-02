// -------------- Member Setting
MemberSettingCollection = new Mongo.Collection("memberSetting");

var Schemas = {};

Schemas.MemberSetting = new SimpleSchema({
    userId: {
        type: String
    },
    language: {
        type: String,
		allowedValues: ['zh-CN','zh-HK','en']
    }
});

MemberSettingCollection.attachSchema(Schemas.MemberSetting);

// -------------- Member Profile image
var imageStore = new FS.Store.GridFS("profilePictures");

MemberProfilePictureCollection = new FS.Collection("profilePicture", { 
    stores: [imageStore],
    filter: {
        maxSize: 2097152, //in bytes
        allow: {
            contentTypes: ['image/*'],
            extensions: ['png','jpg','gif']
        },
        onInvalid: function (message) {
            if(Meteor.isClient){
                alert(message);
            } else{
                console.warn(message);
            }
        }
    }
});
