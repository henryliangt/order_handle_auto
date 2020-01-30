// ==UserScript==
// @name         Tkpd status page actions
// @namespace    http://www.tiaria.id/
// @version      0.2
// @description  Handle tokopedia orders
// @author       HL
// @connect      www.tiaria.id
// @connect      google.com
// @connect      http://adakok.com/
// @connect      http://www.adakok.com/
// @connect      https://adakok.com/
// @connect      https://www.adakok.com/
// @connect      https://script.google.com/
// @connect      https://googleusercontent.com/
// @connect      https://script.googleusercontent.com/
// @connect      script.googleusercontent.com
// @connect      *
// @run-at       document-end
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// @require      https://cdn.jsdelivr.net/jsbarcode/3.6.0/JsBarcode.all.min.js
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_log
// @grant        GM_xmlhttpRequest
// @match        https://*.tokopedia.com/*
// @match        *.akulaku.com/*
// @match        https://merchant.blibli.com/MTA/neo/order/order-detail/?orderNo*
// @match        *.zalora.co.id/order/index/order-detail*
// @match        *.jd.id/*
// @match        *.lazada.co.id/order/detail*
// @match        https://www.bukalapak.com/payment/transactions/print_preview*
// @updateURL    https://raw.githubusercontent.com/henryliangt/order_handle_auto/master/tkpd-status.meta.js
// @downloadURL  https://raw.githubusercontent.com/henryliangt/order_handle_auto/master/tkpd-status.user.js
// ==/UserScript==

(function() {
    'use strict';
window.onload=function() {
	if (window.location.href.includes('seller.tokopedia.com/myshop_order')) {                                                                                                   //handle tkpd order updating down
		console.log(' yes, seller.tokopedia.com/myshop_order included,,, starting XHR download stock now....');
		var stock_list_xhr = GM_xmlhttpRequest({
			method: "GET",
			url: 'https://script.google.com/macros/s/AKfycbxFDzosHE4xfVdbkbR7ixdjg3zsSyQE-ZTAcg6equ5qDKzZnS7v/exec',   //version 1, simple test , get stock_list done.
			onreadystatechange: function (res) {
				console.log('------GM_XHR Request state changed to:------>>>>' + res.readyState);
			},
			onload: function (res) {
				// Lets assume we get JSON back...
				document.querySelector('div.css-1to6rv9 > span').textContent = res.response.slice(0, 20);
				var stock_list = res.response;
				stock_list = stock_list.split(',');
				var sku_elem = document.querySelectorAll('div.product-list__name-wrapper.mb-8 > span');
				for (var i = 0; i < sku_elem.length; i++) {
					console.log(' ----------->real find');
					var order = sku_elem[i].textContent;
					var order_sku = sku_elem[i].textContent.split(' - ')[1];
					var order_sku_amount = stock_list[(stock_list.indexOf(order_sku) + 1)];
					order = order.replace('SKU', order_sku_amount);
					sku_elem[i].textContent = order;
					sku_elem[i].style = "font-size:150%; color:black; font-family:verdana;"
				}
			},
		});

		setTimeout(function () {
			function stock_down() {
				console.log(' yes, seller.tokopedia.com/myshop_order included,,, starting XHR download stock now....');
				var stock_list, sku_elem, quantity, order_sku_amount = 'n/a';
				var stock_url_dev = 'https://script.google.com/a/tiaria.id/macros/s/AKfycbxsdCOuVIFMpYaM3qerTZDUgdDskDiD8bQ5_NAQ0CAP/dev';   //var for xml updating order list.
				var stock_list_xhr = GM_xmlhttpRequest({
					method: "GET",
					// url: stock_url_dev,
					url: 'https://script.google.com/macros/s/AKfycbxFDzosHE4xfVdbkbR7ixdjg3zsSyQE-ZTAcg6equ5qDKzZnS7v/exec',   //version 1, simple test , get stock_list done.
					onreadystatechange: function (res) {
						console.log('------GM_XHR Request state changed to:------>>>>' + res.readyState);
					},
					onload: function (res) {
						// Lets assume we get JSON back...
						stock_list = res.response;
						document.querySelector('div.css-1yfh3sz > div.left-section > span').textContent = stock_list.slice(0, 30);
						stock_list = stock_list.split(',');
						console.log(stock_list);
						console.log(stock_list.indexOf('AKE053'));
						sku_elem = document.querySelectorAll('div.css-133r68y > div > div> div.product-info > div.product-sku');
						for (var i = 0; i < sku_elem.length; i++) {
							console.log(' ----------->real find');
							var order = sku_elem[i].textContent;
							var order_sku = sku_elem[i].textContent;
							order_sku_amount = stock_list[(stock_list.indexOf(order_sku) + 1)];
							// order = order.replace('SKU', order_sku_amount);
							order += '=';
							order += order_sku_amount;
							sku_elem[i].textContent = order;
							sku_elem[i].style = "font-size:150%; color:black; font-family:verdana;"
						}
					},
				});
			}


			console.log('-------======------++++++');
		}, 1000)
	}
}
})();