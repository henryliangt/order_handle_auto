// ==UserScript==
// @name         Tokopedia Bukalapak order barcode
// @namespace    http://www.tiaria.id/
// @version      0.12
// @description  Handle tokopedia orders
// @author       Henry
// @connect      www.tiaria.id
// @run-at       document-end
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// @require      https://cdn.jsdelivr.net/jsbarcode/3.6.0/JsBarcode.all.min.js
// @grant        GM_setValue
// @grant        GM_getValue
// @match        https://*.tokopedia.com/*
// @match        https://www.bukalapak.com/payment/transactions/print_preview*
// @updateURL    https://raw.githubusercontent.com/henryliangt/order_handle_auto/master/order_handle.meta.js
// @downloadURL  https://raw.githubusercontent.com/henryliangt/order_handle_auto/master/order_handle.user.js


// ==/UserScript==
(function() {
    'use strict';
    window.onload=function(){
        console.log('on load');
        /*
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
*/
        var url = window.location.href;
        if(url.includes('https://www.bukalapak.com/payment/transactions/print_preview')){
 //                    alert('bukalapak shipping page');
             document.querySelector('div > div.row.section-logistic-booking > div:nth-child(2)').textContent = 'Tiaria Booking Code';
             var elem = $("div.row > div.row-item.right-side > dl > dd")[0];
             var order_number = elem.textContent;
             console.log(order_number);
             var bc = document.querySelector('div.transaction-slip > div.row > div.row-item > div.brand-logo > img');
             bc.removeAttribute('src');
             bc.setAttribute('style', 'height: 58px')
             bc.setAttribute('id','n');
             setTimeout(function(){$("#n").JsBarcode(order_number,{
                 format: 'CODE128',
                 lineColor: "#0aa",
                 width: 20,
                 height: 800,
                 displayValue: false
             })},100)
         }else if (url.includes('invoice.pl')){
 //                    alert('Invoice page');
             document.querySelector('table > tbody > tr:nth-child(4) > td:nth-child(2) > a').textContent = 'Tiaria Great Jewelry';
             var elem = $("tr > td > table > tbody > tr > td > span")[1];
             var order_number = elem.textContent;
             console.log(order_number);
             var bc = document.querySelector('td > img');
             bc.removeAttribute('src');
             bc.setAttribute('id','n');
             setTimeout(function(){$("#n").JsBarcode(order_number,{
                 format: 'CODE128',
                 lineColor: "#0aa",
                 width: 20,
                 height: 1000,
                 displayValue: false
             })},500) }

    };
})();
