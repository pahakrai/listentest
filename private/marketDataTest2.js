//test
// file in private/ folder

var contents = Assets.getText('chinaAStockList_sh2.csv');

   // By lines
    var lines = contents.split('\n');
	
	// break down into several url arrays
	var urlList = [];
	var i=0;
	var j=0;

	urlList[0] = "";							// append 100 stockcodes to the url
	_.each(lines, function(stockCode) {
		stockCode=stockCode.trim();
		j++;
		if (j>=100) {
			j=0;
			i++;
			urlList[i] = "";
		}
		urlList[i]=urlList[i]+stockCode+",";
	});
	
var counter = 0;

SyncedCron.add({
  name: 'China A stock (SH 2)',
  schedule: function(parser) {
  
    // parser is a later.parse object
    return parser.text('every 15 seconds');
  },
  job: function() {
    counter++;
	Logger.log('info','SyncedCron start');

	
	/*
result content:

var hq_str_sh601001="大同煤业,9.60,9.99,9.53,9.86,9.36,9.52,9.53,22467018,216955972,300,9.52,3000,9.51,60100,9.50,50100,9.49,3200,9.48,2000,9.53,4000,9.55,500,9.56,13000,9.57,1200,9.58,2015-06-26,11:33:55,00";
var hq_str_sh601002="晋亿实业,17.90,18.67,17.85,18.39,17.52,17.80,17.85,17725710,319016134,11800,17.80,6621,17.79,2900,17.78,6200,17.76,18000,17.75,818,17.85,800,17.87,1300,17.88,100,17.90,800,17.94,2015-06-26,11:33:55,00";
var hq_str_sh601005="重庆钢铁,6.12,6.36,5.96,6.27,5.78,5.96,5.97,88091170,529822954,5300,5.96,200,5.95,59200,5.94,47700,5.93,62400,5.92,26900,5.97,18700,5.98,21600,5.99,288400,6.00,38900,6.01,2015-06-26,11:33:55,00";
var hq_str_sh601006="大秦铁路,12.75,13.15,13.21,13.48,12.45,13.21,13.22,202343155,2635706240,22026,13.21,400,13.19,207100,13.15,5800,13.14,4690,13.13,177020,13.22,22700,13.23,52800,13.24,52200,13.25,217637,13.26,2015-06-26,11:33:55,00";
var hq_str_sh601007="金陵饭店,28.80,29.53,26.58,28.80,26.58,0.00,26.58,3970600,107046849,0,0.00,0,0.00,0,0.00,0,0.00,0,0.00,1412546,26.58,11400,26.59,7773,26.60,1000,26.68,300,26.71,2015-06-26,11:33:55,00";

0：”大秦铁路”，股票名字；
1：”27.55″，今日开盘价；
2：”27.25″，昨日收盘价；
3：”26.91″，当前价格；
4：”27.55″，今日最高价；
5：”26.20″，今日最低价；
6：”26.91″，竞买价，即“买一”报价；
7：”26.92″，竞卖价，即“卖一”报价；
8：”22114263″，成交的股票数，由于股票交易以一百股为基本单位，所以在使用时，通常把该值除以一百；
9：”589824680″，成交金额，单位为“元”，为了一目了然，通常以“万元”为成交金额的单位，所以通常把该值除以一万；
10：”4695″，“买一”申请4695股，即47手；
11：”26.91″，“买一”报价；
12：”57590″，“买二”
13：”26.90″，“买二”
14：”14700″，“买三”
15：”26.89″，“买三”
16：”14300″，“买四”
17：”26.88″，“买四”
18：”15100″，“买五”
19：”26.87″，“买五”
20：”3100″，“卖一”申报3100股，即31手；
21：”26.92″，“卖一”报价
(22, 23), (24, 25), (26,27), (28, 29)分别为“卖二”至“卖四的情况”
30：”2008-01-11″，日期；
31：”15:05:32″，时间；	
		
	*/
	
	//var url = "http://hq.sinajs.cn/list=sh601001,sh601002,sh601005,sh601006,sh601007,hk00941";
	
	// loop the urlList and get contents from HTTP get
	_.each(urlList, function(url) {
		
		var http = Npm.require('http');
		var request = http.request({host: 'hq.sinajs.cn', path: '/list='+url}, Meteor.bindEnvironment(function(res) {

			var html = '';
			res.setEncoding('binary');		
			res.on('data', function (chunk) {
				html += chunk;
			});
			res.on('end',Meteor.bindEnvironment(function(){
//				html = iconv.decode(new Buffer(html, 'binary'), 'GBK');
				
				// set js variables according to the returned content
				eval(html);
				
				// parse the html and get the stock code
				var tmpStrArr = html.split(';');
				_.each(tmpStrArr, function(line) {
					stockCode = line.substring(line.indexOf('var hq_str_')+11,line.indexOf('=')).trim();
				
					//update stock quote
					if (stockCode!='') {
						updateStock(eval("hq_str_"+stockCode).split(','), stockCode);
					}
				});
				
				
			}));
			res.on('error', function (err) {
			});
        }));
        request.end();
		
	});		
  }
});

var updateStock = function(data, stockCode) {
		ChinaAStockCollection.update({stockCode: stockCode}, {$set: {
			name: data[0],
			prev: data[2],
			open: data[1],	
            //current: data[3]+(Math.floor(Math.random() * 3)), 	// TESTING
            current: data[3],	
            high: data[4],
            low: data[5],
            volume: data[8],
            turnover: data[9],		
//			lastUpdate: moment().toJSON()    // testing	
			lastUpdate: moment(data[30]+" "+data[31], "YYYY-MM-DD HH:mm:ss").toJSON()		
		}},
		{upsert: true});	
}

var updateHKStock = function(data, stockCode) {
		ChinaAStockCollection.update({stockCode: stockCode}, {$set: {
			name: data[1],
			prev: data[3],
			open: data[2],	
            current: data[4],
            high: data[5],
            low: data[6],
            volume: data[11],
            turnover: data[12],			
			lastUpdate: moment(data[17]+" "+data[18], "YYYY-MM-DD HH:mm:ss").toJSON()		
		}},
		{upsert: true});	
}

//SyncedCron.start();