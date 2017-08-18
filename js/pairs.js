// gets all coins that have btc, ltc, and usdt trading pairs

var pairs;
var coins = [];

$.ajax({
		url: `https://www.cryptopia.co.nz/api/GetTradePairs`,
		success: (data) => {
			pairs = data.Data;
			console.log(pairs.length)
			sift();
			console.log(coins)
		}
})

function sift() {
	pairs = pairs.filter((p) => {
		return p.BaseSymbol == "USDT" || p.BaseSymbol == "BTC" || p.BaseSymbol == "LTC";
	}).sort((a, b) => {
	  var nameA = a.Symbol;
	  var nameB = b.Symbol;
	  return (nameA <= nameB) ? -1 : 1;
	})
	var count = 0
	var last = pairs[0].Symbol
	for (var i=0; i<pairs.length; i++){
		if (last == pairs[i].Symbol) {
			count++
		} else {
			if (count == 3) {
				coins.push(last)
			}
			last = pairs[i].Symbol
			count = 1
		}
	}
}
