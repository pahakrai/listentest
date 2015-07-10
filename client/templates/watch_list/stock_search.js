Template.stockSearch.helpers({
  settings: function() {
    return {
      position: "bottom",
      limit: 10,
      rules: [
        {
		  collection: 'ChinaAStockCollection',
          subscription: 'autocompleteStocks',  // service side autocomplete
          field: "name",
		  matchAll: true,
          template: Template.searchResult,
		  noMatchTemplate: Template.searchNoResult,
		  selector: function(match) {
			// **** don't know why RegExp returns ''
            //var regex;
            //regex = new RegExp(match, 'i');
//console.log('regex='+JSON.stringify(regex));			
            return {
               $or: [{
                      //'stockCode': regex
					  'stockCode': {"$regex": match, "$options":"i"}
                          }, {
                       //'name': regex
                       'name': {"$regex": match, "$options":"i"}				   
                    }]
            };
           }		  
        }
      ]
    };
  }
});

Template.stockSearch.events({
  "autocompleteselect input": function(event, template, doc) {
	// record to watchList
	var user = Meteor.user();
	if (user != null) {
	
	// add to watch list in user profile
	// TODO change to use method, and apply 'deny' rule to Account user for update
	Meteor.users.update({_id:Meteor.user()._id}, {$push:{"profile.watchList": doc.stockCode}})	
	//console.log('test '+JSON.stringify(user));
	
	}
	
  }
});