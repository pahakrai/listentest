if (MemberSettingCollection.find().count() === 0) {

/*
  var tomId = Meteor.users.insert({
    profile: { name: 'Benson Leung' }
  });
*/
  
  // create user bb@bb.com/bbb123
  var testUserId = Meteor.users.insert(  
{ 
  "_id" : "m7P9fp4hKLtaSsgiQ", 
//  "createdAt" : ISODate("2015-06-21T14:24:48.380Z"), 
  "services" : { 
    "password" : { 
	  "bcrypt" : "$2a$10$SPshWc7Sf/XZBz18smzu4eEqt0SWV2AmVmzICVVkVaSZAFPuWc7NW" 
	}, 
	"resume" : { 
	  "loginTokens" : [ { 
//	    "when" : ISODate("2015-06-21T14:24:48.480Z"), 
		"hashedToken" : "5WHXradAI9M5B9ll3VwZaFlSpnVDzdtO0XGi+Sv52sg=" 
	  } ] 
	} 
  }, 
  "emails" : [ { 
    "address" : "bb@bb.com", 
	"verified" : false 
  }], 
  "profile" : { 
    "image" : "/cfs/files/images/S5dciPgrQibzzv7wd" 
  } 
});  
  
  

  var testUser = Meteor.users.findOne(testUserId);

  MemberSettingCollection.insert({
    userId: testUser._id,
    language: 'en'
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