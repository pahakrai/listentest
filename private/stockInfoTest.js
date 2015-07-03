//test
// file in private/ folder
var contents = Assets.getText('chinaAStockList.csv');

// By lines
var lines = contents.split('\n');
	

_.each(lines, function(stockCode) {
	stockCode=stockCode.trim();
	if (stockCode!='') {
		
		//format: http://stockpage.10jqka.com.cn/000008/company/
		var http = Npm.require('http');
		var request = http.request({host: 'stockpage.10jqka.com.cn', path: "/"+stockCode.substring(2)+"/company/"}, Meteor.bindEnvironment(function(res) {
			var html = '';
			//res.setEncoding('binary');		
			res.on('data', function (chunk) {
				html += chunk;
			});
			res.on('end',Meteor.bindEnvironment(function(){
//				html = iconv.decode(new Buffer(html, 'binary'), 'GBK');
				
//				Logger.log('info',html);
				var stockInfoJSON = parseContentToJSON(stockCode, html);
				updateStockInfo(stockCode, stockInfoJSON);
				Logger.log('info','stockInfo update OK '+stockCode);									
			}));
			res.on('error', function (err) {
			});
        }));
        request.end();	

	}			
		
});




var parseContentToJSON = function(stockCode, contents) {
	var $ = cheerio.load(contents);
				
	var stockInfo = {};			
	stockInfo['stockCode'] = stockCode;
    $('.hltip').each(function(i, element){
      var name = $(this).text();
	  var value = "";
	  switch (name) {
		case '公司名称：':
			stockInfo['name_cn'] = $(this).next().text().trim();
			break;
		case '所属地域：':
			stockInfo['location'] = $(this).next().text().trim();
			break;
		case '英文名称：':
			stockInfo['name_en'] = $(this).next().text().trim();
			break;
		case '所属行业：':
			stockInfo['industry'] = $(this).next().text().trim();
			break;
		case '公司网址：':
			stockInfo['website'] = $(this).next().html().trim();
			break;
		case '主营业务：':
			stockInfo['business'] = $(this).next().text().trim();
			break;
		case '控股股东：':
			stockInfo['holder_main'] = $(this).next().text().trim();
			break;
		case '实际控制人：':
			stockInfo['holder_actual'] = $(this).next().text().trim();
			break;
		case '最终控制人：':
			stockInfo['holder_final'] = $(this).next().text().trim();
			break;			
		case '董事长：':
			stockInfo['chairman'] = $(this).next().text().trim();
			break;		
		case '董　　秘：':
			stockInfo['secretary'] = $(this).next().text().trim();
			break;		
		case '法人代表：':
			stockInfo['legal'] = $(this).next().text().trim();
			break;					
		case '总 经 理：':
			stockInfo['gmanager'] = $(this).next().text().trim();
			break;			
		case '注册资金：':
			stockInfo['capital'] = $(this).next().text().trim();
			break;			
		case '员工人数：':
			stockInfo['num_of_employee'] = $(this).next().text().trim();
			break;		
		case '电　　话：':
			stockInfo['phone'] = $(this).next().text().trim();
			break;	
		case '传　　真：':
			stockInfo['fax'] = $(this).next().text().trim();
			break;	
		case '邮      编：':
			stockInfo['postal_code'] = $(this).next().text().trim();
			break;			
		case '办公地址：':
			stockInfo['address'] = $(this).next().text().trim();
			break;		
		case '公司简介：':
			if (this.next().next().children().first() != '') {
				$(this).next().next().children().first().remove(); // remove <a>
				stockInfo['introduction'] = $(this).next().next().text().trim();
			} else {
				stockInfo['introduction'] = $(this).next().text().trim();
			}
			break;					
	  }
    });	
	return stockInfo;
}

				
				

var updateStockInfo = function(stockCode, stockInfo) {
		StockInfoCollection.update({stockCode: stockCode}, {$set: stockInfo},
		{upsert: true});	
}


//SyncedCron.start();