if (MemberSettingCollection.find().count() === 0) {
//if (true) {
  /*
  
    bb@bb.com bbb123
	cc@cc.com bbb123
	dd@dd.com bbb123
	ee@ee.com bbb123
  
  
  */


  // create user b@b.com/bbb123
  // create user c@c.com/bbb123
  // create user d@d.com/bbb123
  // create user e@e.com/bbb123  
  var testUserId = Meteor.users.insert(  
{ 
  "_id" : "bbb@bbb.com", 
//  "createdAt" : ISODate("2015-06-21T14:24:48.380Z"), 
  "services" : { 
    "password" : { 
	  "bcrypt" : "$2a$10$SPshWc7Sf/XZBz18smzu4eEqt0SWV2AmVmzICVVkVaSZAFPuWc7NW" 
	}, 
	"resume" : { 
	  "loginTokens" : [ { 
//	    "when" : ISODate("2015-06-21T14:24:48.480Z"), 
		"hashedToken" : "5WHXradAI9M5B9ll3vwZaFlSpqVDzdtO0XGi+Sv52sg=" 
	  } ] 
	} 
  }, 
  "emails" : [ { 
    "address" : "b@b.com", 
	"verified" : false 
  }], 
  "profile" : { 
    "image" : "/cfs/files/images/S5dciPgrQibzzv7wd" 
  } 
});    
  
var testUserId2 = Meteor.users.insert(  
{ 
  "_id" : "cc@cc.com", 
//  "createdAt" : ISODate("2015-06-21T14:24:48.380Z"), 
  "services" : { 
    "password" : { 
	  "bcrypt" : "$2a$10$SPshWc7Sf/XZBz18smzu4eEqt0SWV2AmVmzICVVkVaSZAFPuWc7NW" 
	}, 
	"resume" : { 
	  "loginTokens" : [ { 
//	    "when" : ISODate("2015-06-21T14:24:48.480Z"), 
		"hashedToken" : "5WHXradAI9M5B9ll3VwZtFlSpnVDzdtO0XGi+Sv52sg=" 
	  } ] 
	} 
  }, 
  "emails" : [ { 
    "address" : "c@c.com", 
	"verified" : false 
  }], 
  "profile" : { 
    "image" : "/cfs/files/images/S5dciPgrQibzzv7wd" 
  } 
});  
var testUserId3 = Meteor.users.insert(  
{ 
  "_id" : "dd@dd.com", 
//  "createdAt" : ISODate("2015-06-21T14:24:48.380Z"), 
  "services" : { 
    "password" : { 
	  "bcrypt" : "$2a$10$SPshWc7Sf/XZBz18smzu4eEqt0SWV2AmVmzICVVkVaSZAFPuWc7NW" 
	}, 
	"resume" : { 
	  "loginTokens" : [ { 
//	    "when" : ISODate("2015-06-21T14:24:48.480Z"), 
		"hashedToken" : "5WHXradAI9M5B9ll3VwZaFlSpnwDzdtO0XGi+Sv52sg=" 
	  } ] 
	} 
  }, 
  "emails" : [ { 
    "address" : "d@d.com", 
	"verified" : false 
  }], 
  "profile" : { 
    "image" : "/cfs/files/images/S5dciPgrQibzzv7wd" 
  } 
});  
var testUserId3 = Meteor.users.insert(  
{ 
  "_id" : "ee@ee.com", 
//  "createdAt" : ISODate("2015-06-21T14:24:48.380Z"), 
  "services" : { 
    "password" : { 
	  "bcrypt" : "$2a$10$SPshWc7Sf/XZBz18smzu4eEqt0SWV2AmVmzICVVkVaSZAFPuWc7NW" 
	}, 
	"resume" : { 
	  "loginTokens" : [ { 
//	    "when" : ISODate("2015-06-21T14:24:48.480Z"), 
		"hashedToken" : "5WHXredAI9M5B9ll3VwZaFlSpnVDzdtO0XGi+Sv52sg=" 
	  } ] 
	} 
  }, 
  "emails" : [ { 
    "address" : "e@e.com", 
	"verified" : false 
  }], 
  "profile" : { 
    "image" : "/cfs/files/images/S5dciPgrQibzzv7wd" 
  }   
});  
  
  
	// test language
  var testUser = Meteor.users.findOne(testUserId);

  MemberSettingCollection.insert({
    userId: testUser._id,
    language: 'en'
  });

  // ----------- insert instange message testing data
  InstantMessageCollection.insert({
	userIds : [testUserId, testUserId2],
	messages : [
	{
		userId: testUserId,
		content: 'sent by bb@bb.com',
		createDate: "2015-06-21T14:24:48.480Z",	   
	},
	{
		userId: testUserId2,
		content: 'sent by cc@cc.com',
		createDate: "2015-06-21T14:25:33.480Z",	   
	},	
	{
		userId: testUserId,
		content: 'haha',
		createDate: "2015-06-21T14:25:48.480Z",	   
	},
	{
		userId: testUserId2,
		content: 'this is cool!!!!!!!!!!!!!',
		createDate: "2015-06-21T14:26:33.480Z",	   
	},		
	],
	lastUpdateDate: "2015-06-21T14:26:33.480Z"
  });
  
  InstantMessageCollection.insert({
	userIds : [testUserId, testUserId3],
	messages : [
	{
		userId: testUserId,
		content: 'sent by bb@bb.com',
		createDate: "2015-05-21T14:24:48.480Z",	   
	},
	{
		userId: testUserId2,
		content: 'sent by dd@dd.com',
		createDate: "2015-05-21T14:25:33.480Z",	   
	},	
	{
		userId: testUserId,
		content: 'haha',
		createDate: "2015-05-21T14:25:48.480Z",	   
	},
	{
		userId: testUserId2,
		content: 'this is cool!!!!!!!!!!!!!',
		createDate: "2015-05-28T14:26:33.480Z",	   
	},		
	],
	lastUpdateDate: "2015-05-28T14:26:33.480Z"
  });  
  
  
  
  // ----------- insert message testing data
  for (i=1;i<=10;i++) {
	MessageCollection.insert({
		_id: i+"_",
		userId: testUser._id,
		parent: null,
		content: "This is my content "+i,
		children: [i+"_"+1,i+"_"+2,i+"_"+3]
	});
	
	for (j=1;j<=3;j++) {
		MessageCollection.insert({
			_id: i+"_"+j,
			userId: testUser._id,
			parent: i+"_",
			content: "This is my comments "+j,
			children: []
		});
	}
	
	/*
	for (i=1;i<=10;i++) {
		MessageCollection.update({_id: i}, {$set: {children: [i+"_"+1,i+"_"+2,i+"_"+3]}});	
	}
	*/	
  }
  
 
}

/*
if (ChinaAStockCollection.find().count() === 0) {
	ChinaAStockCollection.insert({
		stockCode: "sh601001",
		name: "大同煤业",
		prev: 0.0,
		open: 0.0,
		current: 0.0,
		high: 0.0,
		low: 0.0,
		volume: 0,
		turnover: 0,
		lastUpdate: moment().toJSON()
	});

	ChinaAStockCollection.insert({
		stockCode: "sh601002",
		name: "晋亿实业",
		prev: 0.0,
		open: 0.0,
		current: 0.0,
		high: 0.0,
		low: 0.0,
		volume: 0,
		turnover: 0,
		lastUpdate: moment().toJSON()
	});	
	ChinaAStockCollection.insert({
		stockCode: "sh601005",
		name: "重庆钢铁",
		prev: 0.0,
		open: 0.0,
		current: 0.0,
		high: 0.0,
		low: 0.0,
		volume: 0,
		turnover: 0,
		lastUpdate: moment().toJSON()
	});	
	ChinaAStockCollection.insert({
		stockCode: "sh601006",
		name: "大秦铁路",
		prev: 0.0,
		open: 0.0,
		current: 0.0,
		high: 0.0,
		low: 0.0,
		volume: 0,
		turnover: 0,
		lastUpdate: moment().toJSON()
	});	
	ChinaAStockCollection.insert({
		stockCode: "sh601007",
		name: "金陵饭店",
		prev: 0.0,
		open: 0.0,
		current: 0.0,
		high: 0.0,
		low: 0.0,
		volume: 0,
		turnover: 0,
		lastUpdate: moment().toJSON()
	});	
		
}
*/