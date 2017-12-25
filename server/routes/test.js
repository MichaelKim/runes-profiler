const router = require('express').Router();
const riot = require('../riot');

router.get('/', (req, res) => {
	console.log('test');
	const summonerName = req.query.name;
	const region = riot.getRegionEndpoint(req.query.region);

	if (!riot.validName(summonerName)) {
		res.status(400);
		res.send('Invalid summoner name');
		return;
	}

	if (!region) {
		res.status(400);
		res.send('Invalid region');
		return;
	}

	console.log(summonerName, region);
	let finalData = {"player":{"name":"Len Kagamine"},"playerData":{"8005":{"wins":2,"games":6,"stats":[7809,4700,3106]},"8008":{"wins":0,"games":1,"stats":[96,0,0]},"8017":{"wins":2,"games":7,"stats":[4843,0,0]},"8112":{"wins":1,"games":1,"stats":[2076,0,0]},"8135":{"wins":2,"games":2,"stats":[10,0,0]},"8138":{"wins":7,"games":15,"stats":[325,0,0]},"8139":{"wins":5,"games":12,"stats":[13058,0,0]},"8143":{"wins":3,"games":4,"stats":[1894,0,0]},"8210":{"wins":5,"games":9,"stats":[77,0,0]},"8214":{"wins":1,"games":2,"stats":[1380,2783,0]},"8224":{"wins":1,"games":1,"stats":[827,0,0]},"8229":{"wins":4,"games":7,"stats":[15457,0,0]},"8237":{"wins":6,"games":11,"stats":[6142,0,0]},"8243":{"wins":5,"games":10,"stats":[136,0,0]},"8345":{"wins":0,"games":1,"stats":[4,0,0]},"8347":{"wins":0,"games":1,"stats":[0,0,0]},"8429":{"wins":1,"games":3,"stats":[138,35,31]},"8439":{"wins":1,"games":3,"stats":[2145,0,0]},"8451":{"wins":1,"games":3,"stats":[639,0,0]},"8453":{"wins":0,"games":1,"stats":[282,791,0]},"8463":{"wins":1,"games":4,"stats":[5684,0,0]},"9103":{"wins":2,"games":2,"stats":[13,77,0]},"9104":{"wins":1,"games":5,"stats":[49,115,0]},"9105":{"wins":0,"games":1,"stats":[32,52,0]},"9111":{"wins":3,"games":8,"stats":[8980,0,0]}},"globalData":{"8005":{"wins":17,"games":32,"stats":[44558,27183,17359]},"8008":{"wins":1,"games":5,"stats":[662,0,0]},"8009":{"wins":2,"games":3,"stats":[13270,0,0]},"8014":{"wins":35,"games":67,"stats":[45961,0,0]},"8017":{"wins":3,"games":12,"stats":[7370,0,0]},"8021":{"wins":1,"games":2,"stats":[2813,0,0]},"8105":{"wins":5,"games":15,"stats":[71,0,0]},"8112":{"wins":11,"games":26,"stats":[33535,0,0]},"8120":{"wins":5,"games":11,"stats":[120,0,0]},"8124":{"wins":0,"games":1,"stats":[759,0,0]},"8126":{"wins":19,"games":27,"stats":[15449,0,0]},"8128":{"wins":4,"games":11,"stats":[36463,0,0]},"8134":{"wins":6,"games":10,"stats":[50,0,0]},"8135":{"wins":26,"games":51,"stats":[250,0,0]},"8136":{"wins":3,"games":4,"stats":[24,0,0]},"8138":{"wins":30,"games":62,"stats":[1418,0,0]},"8139":{"wins":8,"games":22,"stats":[24155,0,0]},"8143":{"wins":17,"games":42,"stats":[26912,0,0]},"8210":{"wins":39,"games":74,"stats":[306,0,0]},"8214":{"wins":17,"games":29,"stats":[45705,26615,0]},"8224":{"wins":6,"games":17,"stats":[15473,0,0]},"8226":{"wins":20,"games":41,"stats":[60881,0,0]},"8229":{"wins":27,"games":52,"stats":[94387,0,0]},"8230":{"wins":0,"games":2,"stats":[14,0,0]},"8232":{"wins":1,"games":1,"stats":[138,0,0]},"8233":{"wins":3,"games":15,"stats":[7881,0,0]},"8234":{"wins":16,"games":27,"stats":[504,0,0]},"8236":{"wins":20,"games":34,"stats":[600,0,0]},"8237":{"wins":36,"games":73,"stats":[42338,0,0]},"8242":{"wins":8,"games":14,"stats":[223,0,0]},"8243":{"wins":33,"games":59,"stats":[843,0,0]},"8299":{"wins":3,"games":4,"stats":[2552,0,0]},"8304":{"wins":5,"games":12,"stats":[80,12,0]},"8306":{"wins":0,"games":2,"stats":[8,0,0]},"8313":{"wins":5,"games":11,"stats":[0,0,0]},"8316":{"wins":0,"games":1,"stats":[759,0,0]},"8321":{"wins":3,"games":5,"stats":[14,0,0]},"8339":{"wins":0,"games":1,"stats":[0,0,0]},"8345":{"wins":5,"games":6,"stats":[24,0,0]},"8347":{"wins":13,"games":23,"stats":[0,0,0]},"8359":{"wins":3,"games":4,"stats":[2435,101,0]},"8410":{"wins":0,"games":1,"stats":[42,0,0]},"8429":{"wins":14,"games":27,"stats":[1272,378,296]},"8430":{"wins":3,"games":9,"stats":[194,0,0]},"8435":{"wins":2,"games":4,"stats":[64,0,0]},"8437":{"wins":10,"games":15,"stats":[12934,12221,0]},"8439":{"wins":9,"games":21,"stats":[24974,0,0]},"8444":{"wins":12,"games":19,"stats":[30265,0,0]},"8446":{"wins":3,"games":3,"stats":[4976,0,0]},"8451":{"wins":7,"games":17,"stats":[3601,0,0]},"8453":{"wins":3,"games":8,"stats":[11877,5916,0]},"8463":{"wins":11,"games":25,"stats":[25895,0,0]},"9101":{"wins":2,"games":3,"stats":[669,785,0]},"9103":{"wins":6,"games":11,"stats":[100,333,0]},"9104":{"wins":12,"games":32,"stats":[314,746,0]},"9105":{"wins":8,"games":10,"stats":[101,370,0]},"9111":{"wins":42,"games":85,"stats":[137770,0,0]}}};
	res.send(finalData);
});

module.exports = router;