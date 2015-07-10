 Template.stockTest.helpers({
    'list': function(){
//        return ChinaAStockCollection.find({stockCode: { $in: ['sh601001','sh601002','sh601005','sh601006','sh601007','sh600006','sh600007','sh600008','sh600009','sh600009','sh600010','sh600011','sh600012','sh600015','sh600016','sh600017']}});
        return ChinaAStockCollection.find();
    }
});

// format time
UI.registerHelper('formatTime', function(context, options) {
  if(context)
    return moment(context).format('MM/DD/YYYY, HH:mm:ss');
});

stockCurrent = [];
UI.registerHelper('selectedClass', function(context, options) {
	    var stockCode = this.stockCode;
		var current = this.current;
		var prevCurrent = stockCurrent[stockCode];

		stockCurrent[stockCode] = current;
		//Session.set(stockCode, current);
		if (prevCurrent != null && current != prevCurrent) {
		console.log((current!=prevCurrent)+' stockCode='+stockCode+' prevCurrent='+prevCurrent+' current='+current);
			return "animateColor";
		}
});