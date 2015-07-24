Router.configure({
    layoutTemplate: 'appLayout',
//    layoutTemplate: 'masterLayout',
    loadingTemplate: 'loading',
//    yieldTemplates: {
//        nav: {to: 'nav'},
//        footer: {to: 'footer'},
//    }
    notFoundTemplate: 'pageNotFound',
    /*-- waitOn: function(){
      return [Meteor.subscribe(notifications)];
    } */
});

PostsListController = RouteController.extend({
  increment: 5,
  postsLimit: function() {
    return parseInt(this.params.postsLimit) || this.increment;
  },
  subscriptions: function() {
    //var limit = parseInt(this.params.postsLimit) || this.increment;
    this.postsSub = Meteor.subscribe('userposts', { limit: this.postsLimit()});
  },
  newposts: function() {
    return UserPosts.find({}, { limit: this.postsLimit()});
  },
  data: function() {
    //var limit = parseInt(this.params.postsLimit) || 5;
    var hasMore = this.newposts().count() === this.postsLimit();
    var nextPath = this.route.path({postsLimit: this.postsLimit() + this.increment});
    return {
      postslist: this.newposts(),
      ready: this.postsSub.ready,
      nextPath: hasMore ? nextPath : null
    };
  }

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

Router.route('/notifications',{
  name: 'notifications',
  template: 'notifications',
  waitOn: function() {
    return Meteor.subscribe('notifications');
  }
});

/* -- Router.route('/posts/:_id',{
  name:'posts',
  template:'posts', */
  /*-- subscriptions: function() {
    return Meteor.subscribe('userspost');
  },--*/
  /*waitOn: function() {
    return Meteor.subscribe('userspost', this.params._id);
  },
  data: function() { return Posts.findOne(this.params._id); }

});*/
Router.route('/singlepost/:_id', {
  name: 'postsid',
  template: 'postpage',
  //subscriptions: function() {
     //return Meteor.subscribe("postpage", {_id: this.params._id});
  //},
  data: function(){
    return  UserPosts.findOne({_id: this.params._id});
  }
});

Router.route('/posts/:postsLimit?', {
//  path: 'posts/list',
  name: 'posts',
  template: 'posts',
  controller : PostsListController
});

Router.route('/post/:userid?',{
  name:'postmain'
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

/*-- var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
}

Router.onBeforeAction(requireLogin, {only: 'posts'}); --*/
