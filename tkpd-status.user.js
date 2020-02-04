// ==UserScript==
// @name         Tkpd status page actions
// @namespace    https://www.tiaria.id/
// @version      0.34
// @description  Handle tokopedia orders
// @author       HL
// @connect      https://www.tiaria.id
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
// @grant        GM_openInTab
// @grant        GM_log
// @grant        GM_xmlhttpRequest
// @match        https://*.tokopedia.com/*
// @match        *.akulaku.com/*
// @match        https://merchant.blibli.com/MTA/neo/order/order-detail/?orderNo*
// @match        *.zalora.co.id/order/index/order-detail*
// @match        *.jd.id/*
// @match        *.lazada.co.id/order/detail*
// @match        https://www.bukalapak.com/payment/transactions/print_preview*
// @updateURL    https://raw.github.com/henryliangt/order_handle_auto/master/tkpd-status.meta.js
// @downloadURL  https://raw.github.com/henryliangt/order_handle_auto/master/tkpd-status.user.js
// ==/UserScript==

(function() {
	'use strict';
	window.onload=function() {
		if (window.location.href.includes('seller.tokopedia.com/myshop_order')) {                                                                                                   //handle tkpd order updating down
			console.log(' yes, seller.tokopedia.com/myshop_order included,,, starting XHR download stock now....');
			var stock_list_xhr = GM_xmlhttpRequest({
				method: "GET",
				url: 'https://script.google.com/macros/s/AKfycbxFDzosHE4xfVdbkbR7ixdjg3zsSyQE-ZTAcg6equ5qDKzZnS7v/exec',   //version 1, simple test , get stock_list done.
				onreadystatechange: function (res) {console.log('-1-GM_XHR Request state changed to:-->>>' + res.readyState);},
				onload: function (res) {
					// Lets assume we get JSON back...
					document.querySelector('#merchant-root > div > div > div.css-1yfh3sz > div.left-section > span').textContent = res.response.slice(0, 40);
					var stock_list = res.response;
					stock_list = stock_list.split(',');
					var sku_elem = document.querySelectorAll('div > div> div.product-info > div.product-sku');
					for (var i = 0; i < sku_elem.length; i++) {
						console.log('---SKU(s) in this page--->');
						var order               = sku_elem[i].textContent;
						var order_sku           = sku_elem[i].textContent;
						var order_sku_amount    = stock_list[(stock_list.indexOf(order_sku) + 1)];
						order                  += '=';
						order                  += order_sku_amount;
						sku_elem[i].textContent = order;
						sku_elem[i].style       = "font-size:150%; color:black; font-family:verdana;"
					};
					function collect_invoice (){
						var invoice_urls_arr    = [];
						var invoice_urls_elem   = document.querySelectorAll('a.invoice');
						for(var k=0; k<invoice_urls_elem.length; k++) {
							// console.log(invoice_urls_elem[k].href);
							invoice_urls_arr.push(invoice_urls_elem[k].href);
						}
						// console.log('ALL invoice in 1st func=' + typeof invoice_urls_arr + " length=" + invoice_urls_arr.length + invoice_urls_arr + '=' );
						return invoice_urls_arr
					}
					var invoice_url_arr    = collect_invoice();
					var index           = 0;
					function OrderExist(){
						var invoice_url_arr     = collect_invoice();
						var invoice_amount      = invoice_url_arr.length;

						var invoice_urls_elem   = document.querySelectorAll('a.invoice');
						// console.log('OrderExist function all invoice=' + typeof invoice_url_arr + "   length=" + invoice_url_arr.length + invoice_url_arr + '=' );
						if(invoice_url_arr.length > 0){
							// console.log(invoice_url_arr.length);
							var order_exist     = setTimeout(
						function(){
									var invoice_urls_tosend = [];
									// var invoice_url_arr = collect_invoice();
									console.log('Hi ' + index + '/' +invoice_url_arr.length + ' = '+document.querySelectorAll('a.invoice')[index].textContent);

									// console.log();
									var order_check_online_xhr = GM_xmlhttpRequest({
										method:   'GET',
										url   :   'http://adakok.com/api/order-exist' + '?' + 'order_url=' + invoice_url_arr[index] ,
										onreadystatechange: function (res) {console.log('-2-ordercheck online_XHR, already in data base ?:-->>>' + res.readyState);},
										onload: function (res) {
											var result = res.response;
											console.log(typeof result  + "=" + result.length + '=' +result);
											if(result.length > 3){
												invoice_urls_elem[index-1].style = 'color:blue;';
												console.log('Yes, in, '+ document.querySelectorAll('a.invoice')[index-1].textContent)  + 'blue, colored');
											}else{
												invoice_urls_tosend.push(invoice_url_arr[index-1]);
												console.log("TO send 1by1 " + invoice_urls_tosend);
												GM_openInTab(invoice_url_arr[index-1]);
											};
										}
									})
									index++;
									console.log("TO send " + invoice_urls_tosend);
									index < invoice_amount ? OrderExist() : clearTimeout(order_exist);
									index < 5 ? OrderExist() : clearTimeout(order_exist);
								},500)
						}
					// return invoice_urls_tosend
					}
					var invoice_url_tosend = OrderExist(invoice_url_arr);
					console.log('TO send final =' + invoice_url_tosend);
			}})

			// function collect_invoice (){
			// 	console.log('ALL invoice=  ' + typeof invoice_urls_arr + "   length=" + invoice_url_arr.length + invoice_url_arr + '=' );
			// 	var index               = 0;
			// 	var invoice_amount      = invoice_url_arr.length;
			// 	return invoice_url_arr
			// 	(function open_invoice(){
			// 		var open            = setTimeout(
			// 			function(){
			// 				console.log(index);
			// 				console.log(invoice_urls_arr[index]);
			// 				GM_openInTab(invoice_urls_arr[index]);
			// 				index++;
			// 				index < invoice_amount ? open_invoice() : clearTimeout(open);
			// 			},5000)
			// 	})()
			// };
		}
	}
})();