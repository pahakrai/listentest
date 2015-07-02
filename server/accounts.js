
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