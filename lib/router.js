Router.configure({
    layoutTemplate: 'masterLayout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'pageNotFound',
    yieldTemplates: {
        nav: {to: 'nav'},
        footer: {to: 'footer'},
    }
});

Router.map(function() {
    this.route('home', {
        path: '/',
    });

    this.route('public');
});

Router.map(function() {
    this.route('setting', {
        path: '/setting',
    });

    this.route('private');
});


Router.route('/profile',{
 name: 'profile',
 waitOn: function () {
 return Meteor.subscribe('profilePicture');
 },
});

//TESTING
Router.route('/stockTest',{
 name: 'stockTest',
 waitOn: function () {
 return Meteor.subscribe('chinaAStock', ['sh601001','sh601002','sh601005','sh601006','sh601007','sh600006','sh600007','sh600008','sh600009','sh600009','sh600010','sh600011','sh600012','sh600015','sh600016','sh600017']);
 },
});

// Stock view detail

Router.route('/stockInfo/:_id', {
  name: 'stockInfo',
  waitOn: function() {
    return [
      Meteor.subscribe('singleStockInfo', this.params._id),
    ];
  },
  // NOTE: I have no idea why the data function CANNOT return  StockInfoCollection.find().
  //data: function() {return StockInfoCollection.find(); }
  data: function() {
		var outputStock;
		var cursor = StockInfoCollection.find();
		cursor.forEach(function(stock) {
			outputStock = stock;
		});
		return outputStock;  
  }

});

Router.plugin('ensureSignedIn', {
  only: ['private']
  //except: ['home', 'atSignIn', 'atSignUp', 'atForgotPassword']
});

Router.onBeforeAction(function () {
//	var setting = Session.get('setting');
//	setLanguage(setting.language);

	Meteor.subscribe("settings");
	console.log('testing route='+this.request.url);

	// if login, setLanguage from member setting 
	var setting = MemberSettingCollection.findOne();
	if (setting != null) {
		console.log(setting);
		setLanguage(setting.language);
	}

	this.next();
});


 
 