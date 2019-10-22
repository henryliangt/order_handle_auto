// ==UserScript==
// @name         Tokopedia order
// @namespace    http://www.tiaria.id/
// @version      0.1
// @description  Handle tokopedia orders
// @author       Henry
// @connect      www.tiaria.id
// @run-at       document-end
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// @require      https://cdn.jsdelivr.net/jsbarcode/3.6.0/JsBarcode.all.min.js
// @grant        GM_setValue
// @grant        GM_getValue
// @match        https://*.tokopedia.com/*
// @updateURL    https://raw.githubusercontent.com/henryliangt/order_handle_auto/master/order_handle.meta.js
// @downloadURL  https://raw.githubusercontent.com/henryliangt/order_handle_auto/master/order_handle.user.js


// ==/UserScript==
var $ = unsafeWindow.jQuery;
var jQuery = unsafeWindow.jQuery;
var JsBarcode = unsafeWindow.JsBarcode;

;(function() {
    'use strict';
    var $ = unsafeWindow.jQuery;
    var JsBarcode = unsafeWindow.JsBarcode;
    //     var data_url = 'https://api.worldbank.org/v2/indicators/NY.GDP.MKTP.CD?format=json';
     var data_url = 'https://api.ipify.org/?format=json';
  //  var data_url = 'https://swapi.co/api/people/1/?format=json';
    var usd;
    var x = new XMLHttpRequest();


    window.onload=function(){
    console.log('window on load');

         console.log('Just 1 second');
         var url = window.location.href;
         if(url.includes('myshop_order?status')){
             alert(url.split('?')[1].split("=")[1]);
         setTimeout(function(){
             //

             function aj(data_url, usd, x){

                 console.log(x.readystate);
                 x.open('GET', data_url, true);
                 alert('hi');
                 x.send();
                 alert(x);
                 alert(1);
                 usd = x.response;
                 console.log(x.response);
                 alert(x.response);
                 console.log(x.responseURL);

                 return x;
             };
         x = aj(data_url, usd, x);
             //
             //
         var platform = 'Tokopedia', shop='tiaria', order_number, consignee_name, consignee_tele, address, shipping_kurir, shipping_booking_code, product, sku,quantity, unit_price, sub_total, shipping_cost, fees,income, order_time;

         order_number = document.querySelectorAll('div.info > div.order-summary-wrapper > a');
         consignee_name = document.querySelectorAll('div.col.col--address.big-gutters > div > div.col--address__destination');

         shipping_kurir = document.querySelectorAll('div.col.col--shipping.big-gutters > div.section > span:nth-child(3)');
         shipping_booking_code = document.querySelectorAll('div.section > span:nth-child(5)');

         product = document.querySelectorAll('div.css-ag7m9 > div > div > div.product-list__name-wrapper.mb-8 > a');
         sku = document.querySelectorAll('div.css-ag7m9 > div > div > div.product-list__name-wrapper.mb-8 > span');
         quantity = document.querySelectorAll('div.css-qddqv4 > div.css-ag7m9 > div > div > div.product-list__name-wrapper.mb-8 > div > span:nth-child(1)');
         unit_price = document.querySelectorAll('div.product-list__name-wrapper.mb-8 > div > span.text-gray > span');
         sub_total = document.querySelectorAll(' div.col.col--pricing.big-gutters > span.total-price');

         shipping_cost = document.querySelectorAll('div.col.col--shipping.big-gutters > div.section > span:nth-child(3) > span.text-gray');
         fees = 'tkpd standard';
         income = document.querySelectorAll(' div.col.col--pricing.big-gutters > span.total-price');
         order_time = document.querySelectorAll('section > div.css-80jn82 > div.info > div.order-summary-wrapper > span.order-date');

         for(var i=0; i < unit_price.length; i++){
             console.log(platform, shop, order_number[i].textContent, consignee_name[i].textContent, shipping_kurir[i].textContent, product[i].textContent, '  SKU not yet  ',quantity[i].textContent, unit_price[i].textContent, sub_total[i].texstContent, shipping_cost[i].textContent, fees, income[i].textContent, order_time[i].textContent)
//             console.log(unit_price[i].textContent);
//             console.log(product[i].textContent);
         };
    }, 1000)} else if (url.includes('invoice.pl')){
 //                    alert('Invoice page');
             function newSender(){
                 document.querySelector('table > tbody > tr:nth-child(4) > td:nth-child(2) > a').textContent = 'Tiaria Great Jewelry';
             }
             setTimeout(newSender(), 1000);
             //
             var btn = document.createElement("BUTTON");
             btn.textContent = "Click Me";
//             document.querySelector("table > tbody > tr:nth-child(4) > td:nth-child(2) > a").appendChild(btn);
             //
             var GM_BC = document.createElement('script');
             GM_BC.src = 'https://cdn.jsdelivr.net/jsbarcode/3.6.0/JsBarcode.all.min.js';
             GM_BC.type = 'text/javascript';
             document.getElementsByTagName('head')[0].appendChild(GM_BC);
             function BC_wait(){
                 if(typeof unsafeWindow.JsBarcode == 'undefined')
                     {window.setTimeout(BC_wait, 100);}
                 else{
                     JsBarcode = unsafeWindow.JsBarcode;
                      letsbc();}
             }
             BC_wait();
             function letsbc(){
 //               alert(JsBarcode); //check if JsBarcode works
             }
           //
             var elem = $("tr > td > table > tbody > tr > td > span")[1];
             var order_number = elem.textContent;
             console.log(order_number);
             var bc = document.querySelector('td > img');
             bc.removeAttribute('src');
             bc.setAttribute('id','n');
             setTimeout(function(){$("#n").JsBarcode(order_number,{
                 format: 'CODE128',
                 lineColor: "#0aa",
                 width: 10,
                 height: 2000,
                 displayValue: false
             })},500)

            //
             var barcode = document.createElement("img");
             barcode.setAttribute('id','barcode');
             barcode.setAttribute('src','https://ecs7.tokopedia.net/img/cache/215-square/shops-1/2017/1/18/229510/229510_481789bb-62c4-4f3b-9f24-42b6b2d923ba.jpeg')
//             barcode.JsBarcode("#barcode", "Hi");

             JsBarcode("#barcode", elem.textContent, {
                 format: "code128",
                 lineColor: "#000000",
                 width: 60,
                 height: 1200,
                 displayValue: false
             });

             document.getElementsByTagName('body')[0].appendChild(barcode);

         }
    };
})();
