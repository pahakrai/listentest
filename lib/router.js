Router.configure({
    layoutTemplate: 'appLayout',
//    layoutTemplate: 'masterLayout',
    loadingTemplate: 'loading',
//    yieldTemplates: {
//        nav: {to: 'nav'},
//        footer: {to: 'footer'},
//    }
    notFoundTemplate: 'pageNotFound',
});

InstantMessageListController = RouteController.extend({
  increment: 10, 
  itemsLimit: function() { 
    return parseInt(this.params.itemsLimit) || this.increment; 
  },
  findOptions: function() {
    return {sort: this.sort, limit: this.itemsLimit()};
  },
  subscriptions: function() {
    this.itemsSub = Meteor.subscribe('instantMessageList', this.findOptions());

  },
  list: function() {
    return InstantMessageCollection.find({}, this.findOptions());
  },
  data: function() {
    var hasMore = this.list().count() === this.itemsLimit();
    var nextPath = this.route.path({itemsLimit: this.itemsLimit() + this.increment});
    return {
      list: this.list(),
	  ready: this.itemSub && this.itemsSub.ready,  // if not ready then show spinner
      nextPath: hasMore ? this.nextPath() : null
    };
  }
});

WatchListController = RouteController.extend({
  increment: 10, 
  itemsLimit: function() { 
    return parseInt(this.params.itemsLimit) || this.increment; 
  },
  findOptions: function() {
    return {sort: this.sort, limit: this.itemsLimit()};
  },
  subscriptions: function() {
	var user =  Meteor.user();
	if (user != null) {

		// load stockCollection base on user profile's watchList
		var wl = [];
		if (user.profile != null && user.profile.watchList != null) {
			wl = user.profile.watchList;
		}
		
		this.itemsSub = Meteor.subscribe('chinaAStock', wl, this.findOptions());
	}  
    // todo itemsSub?   

  },
  list: function() {
    return ChinaAStockCollection.find({}, this.findOptions());
  },
  nextPath: function() {
    return Router.routes.watchList.path({itemsLimit: this.itemsLimit() + this.increment})
  },
  data: function() {
    var hasMore = this.list().count() === this.itemsLimit();
    var nextPath = this.route.path({itemsLimit: this.itemsLimit() + this.increment});
    return {
      list: this.list(),
	  ready: this.itemSub && this.itemsSub.ready,  // if not ready then show spinner
      nextPath: hasMore ? this.nextPath() : null
    };
  }
});





Router.route('/',{
 name: 'home',
 /* 
 waitOn: function () {

	Meteor.subscribe("settings");
//	console.log('testing route='+this.request.url);

	// if login, setLanguage from member setting 
	var setting = MemberSettingCollection.findOne();
	if (setting != null) {
		console.log(setting);
		setLanguage(setting.language);
	}   
 },
 */
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

Router.route('/instantMessageList',{
 name: 'instantMessageList',
 controller: InstantMessageListController 
});

Router.route('/instantMessage/:_id', {
  name: 'instantMessage',
  waitOn: function() {
    return [
      Meteor.subscribe('instantMessage', this.params._id),
    ];
  },

  data: function() {return InstantMessageCollection.findOne(); }

});


Router.route('/watchList/:itemsLimit?',{
 name: 'watchList',
 controller: WatchListController 
});

// Stock view detail
Router.route('/stockInfo/:stockCode',{
 name: 'stockInfo'
});
/*
Router.route('/stockInfo/:stockCode', {
  name: 'stockInfo',
  waitOn: function() {
console.log('info','stoctInfo waitOn');  
    return [
      Meteor.subscribe('singleStockInfo', this.params.stockCode),
    ];
  },

  data: function() {return StockInfoCollection.findOne(); }

});
*/


Router.plugin('ensureSignedIn', {
  only: ['watchList','instantMessage','instantMessageList']
  //except: ['home']
});
