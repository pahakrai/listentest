/* user profile are editable by default even insecure has been removed
  https://dweldon.silvrback.com/common-mistakes
*/
/*
Meteor.users.deny({
  update: function() {
    return true;
  }
});
*/

Accounts.onCreateUser(function(options, user) {
  Logger.log('info', 'New user:'+user._id+' created');

  // create MemberSetting
  MemberSettingCollection.insert({userId: user._id, language: 'zh-CN'});
	
  return user;
});

/*
Accounts.onLogin(function(user){
  Logger.log('info', 'Login :'+user.user._id+' login');
  
  // find MemberSetting
  var setting = MemberSettingCollection.findOne({userId: user.user._id});
  
  Logger.log('info', 'setting :'+setting.language);

});
*/