var coins = ["ARK", "BCH", "BSD", "CHC", "DASH", "DCR", "DOGE", "DOT", "ETC", "ETH", "HUSH", "INPAY", "NAV", "PIVX", "SKY", "UNO", "WAVES", "XMR", "ZEC"]
var coin = coins[Math.floor(Math.random()*coins.length)];
var position = 'buy';
var usdt;
var btc;
var ltc;
var btcusd;
var ltcusd;

// make dropdown menu
$.each(coins, (val, text) => {
	$('#symbols').append(
	    $('<option></option>').val(text).html(text)
	);
})

// set coin value
$('#button').click(() => {
	usdt = null;
	btc = null;
	ltc = null;
	coin = $('#symbols').val();
	position = $("input[name='position']:checked").val();
	updateDOM();
});

// update the DOM
function updateDOM() {
	if (usdt && btc && ltc && btcusd && ltcusd){
		$('#price').html(
			`<h3>${coin}</h3><br>
			<h4>USDT: $${usdt.toFixed(5)}</h4>
			<h4>BTC: $${(btc * btcusd).toFixed(5)}</h4>
			<h4>LTC: $${(ltc * ltcusd).toFixed(5)}</h4>`
		);
	} else {
		$('#price').html('loading prices')
	}
}

// get price in usdt
setInterval(() => {
	$.ajax({
	    url: `https://www.cryptopia.co.nz/api/GetMarket/${coin}_USDT`,
	    success: (data) => {
				if (position == 'buy'){
					usdt = data.Data.AskPrice;
				} else {
					usdt = data.Data.BidPrice;
				}
	    }
	})
}, 1000);

// get price in btc
setInterval(() => {
	$.ajax({
	    url: `https://www.cryptopia.co.nz/api/GetMarket/${coin}_BTC`,
	    success: (data) => {
				if (position == 'buy'){
					btc = data.Data.AskPrice;
				} else {
					btc = data.Data.BidPrice;
				}
	    }
	})
}, 1000);

// get price in ltc
setInterval(() => {
	$.ajax({
	    url: `https://www.cryptopia.co.nz/api/GetMarket/${coin}_LTC`,
	    success: (data) => {
				if (position == 'buy'){
					ltc = data.Data.AskPrice;
				} else {
					ltc = data.Data.BidPrice;
				}
	    }
	})
}, 1000);

// get btc price
setInterval(() => {
	$.ajax({
	    url: `https://api.coinmarketcap.com/v1/ticker/bitcoin/`,
	    success: (data) => {
	      btcusd = data[0].price_usd;
	    }
	})
}, 1000);

// get ltc price
setInterval(() => {
	$.ajax({
	    url: `https://api.coinmarketcap.com/v1/ticker/litecoin/`,
	    success: (data) => {
	      ltcusd = data[0].price_usd;
	    }
	})
}, 1000);

// update DOM
setInterval(() => updateDOM(), 1000)
