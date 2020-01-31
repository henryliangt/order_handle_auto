// ==UserScript==
// @name         Tkpd invoice page Barcode + Order update
// @namespace    http://www.tiaria.id/
// @version      0.27
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
// @updateURL    https://raw.githubusercontent.com/henryliangt/order_handle_auto/master/tkpd-invoice-update.meta.js
// @downloadURL  https://raw.githubusercontent.com/henryliangt/order_handle_auto/master/tkpd-invoice-update.user.js


// ==/UserScript==
(function() {
    'use strict';
    window.onload=function(){
        console.log('on load');
        var url = window.location.href;
        if(url.includes('www.tokopedia.com/invoice.pl')){
            // alert('Invoice page');
            // document.querySelector('table > tbody > tr:nth-child(4) > td:nth-child(2) > a').textContent = 'Tiaria Great Jewelry';
            var new_order_product         = '';
            var new_order_product_url     = '';
            var new_order_note            = '';
            var new_order_notes           = '';
            var new_order_sku             = '';
            var new_order_item            = 0 ;
            var new_order_pcs             = '';
            var new_order_price           = '';
            // console.log(order_rows);
            var new_order_product_arr     = [];
            var new_order_product_url_arr = [];
            var new_order_note_arr        = [];
            var new_order_sku_arr         = [];
            var new_order_pcs_arr         = [];
            var new_order_price_arr       = [];

            var seller                       = document.querySelector('table > tbody > tr:nth-child(4) > td:nth-child(2) > a').textContent.trim();
            var new_order                    = '';
            var new_order_numbers_elem       = $("tr > td > table > tbody > tr > td > span")[1];
            var new_order_number             = new_order_numbers_elem.textContent;
            var new_order_url                = window.location.href;
            console.log(new_order_url);
            var plt                          = new_order_url.split('//')[1].split('/')[0].split('.')[1];
            console.log(plt);
            var new_order_consignees         = document.querySelector('body > div.content-area > div > table > tbody > tr:nth-child(1) > td > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(2) > td > span');
            console.log(new_order_consignees.textContent);
            var new_order_contact_elem       = document.querySelector('td:nth-child(2) > table > tbody > tr:nth-child(2) > td > div');     //tel add 3 in 1
            console.log(new_order_contact_elem.innerHTML.split('<br>')[0].trim());
            console.log(new_order_contact_elem.innerHTML.split('<br>')[1].trim());
            var new_order_add                = '';
            new_order_add                   += new_order_contact_elem.innerHTML.split('<br>')[0].trim();
            new_order_add                   += '..';
            new_order_add                   += new_order_contact_elem.innerHTML.split('<br>')[1].trim();
            console.log(new_order_contact_elem.innerHTML.split('<br>')[2].trim());
            var new_order_tel                ='';
            new_order_tel                   += new_order_contact_elem.innerHTML.split('<br>')[2].trim();
            var new_order_kurir_elem         = document.querySelector('body > div.content-area > div > table > tbody > tr:nth-child(3) > td > div:nth-child(2) > table > tbody > tr:nth-child(1) > td > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(1) > td:nth-child(1)');                           var new_order_booking =    document.querySelectorAll('div.section >  span:nth-child(5)');                           //maybe no booking
            var new_order_kurir              = new_order_kurir_elem.textContent.split('(')[0];
            console.log(new_order_kurir);
            var new_order_commission         = '0';
            var new_order_time_elem          = document.querySelectorAll(' table > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(5) > td:nth-child(2)');
            var new_order_time               = new_order_time_elem[0].textContent;
            var new_order_shipping_elem      = document.querySelector('body > div.content-area > div > table > tbody > tr:nth-child(3) > td > div:nth-child(2) > table > tbody > tr:nth-child(1) > td > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(1) > td:nth-child(2)');
            var new_order_shipping           = new_order_shipping_elem.textContent.split('.').join('').replace('Rp','').trim();
            console.log(new_order_shipping);
            var new_order_pay_elem           = document.querySelectorAll('table > tbody > tr> td > table > tbody > tr > td > table > tbody > tr > td');
            var new_order_pay                = new_order_pay_elem[new_order_pay_elem.length-1].textContent.split('.').join('').replace('Rp','').trim();
            console.log(new_order_pay);
            // var new_order_amount             =     document.querySelectorAll('table > tbody > tr:nth-child(4) > td:nth-child(2) > table > tbody > tr:nth-child(2) > td:nth-child(2)');
            // console.log(new_order_amount[0].textContent.split('.').join('').replace('Rp',''));
            var new_order_resi_elem          =       document.querySelector('tr:nth-child(2) > td:nth-child(1) > div:nth-child(3) > span');
            var new_order_resi               = '';
            if(new_order_resi_elem){
                new_order_resi               = new_order_resi_elem.textContent.replace(',','_');
                console.log(new_order_resi);
            }
	        var order_rows                   = document.querySelectorAll('body > div.content-area > div > table > tbody > tr:nth-child(2) > td > table > tbody > tr');

            var new_order_amount_elem        = order_rows[order_rows.length-1].querySelector('td:nth-child(2) > table > tbody > tr:nth-child(2) > td:nth-child(2)');
            var new_order_amount             = new_order_amount_elem.textContent.split('.').join('').replace('Rp','');
            console.log(new_order_amount.trim());
            if(order_rows.length < 5){
            	new_order_item               = 1;
                var new_order_product_elem   = document.querySelectorAll('tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td:nth-child(1) > a');
                new_order_product            = new_order_product_elem[0].textContent.replace(',','_');
                new_order_product_url        = new_order_product_elem[0].href.replace(',','_');
                console.log(new_order_product_url);
                var new_order_sku_elem       = document.querySelectorAll('tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td:nth-child(1) > div:nth-child(2)');
                new_order_sku                = new_order_sku_elem[0].textContent.replace('SKU - ','').trim().replace(',','_');
                console.log('new order sku'  + new_order_sku);
                if (new_order_sku          === '') {
                    new_order_sku            = 'No SKU';
                }
                console.log('new order sku'  + new_order_sku);
                var new_order_pc_elem        = document.querySelectorAll('tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td:nth-child(2)');
                var new_order_pc = new_order_pc_elem[0].textContent.trim();
                console.log(new_order_pc);
                var new_order_price_elem     = document.querySelectorAll('tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td:nth-child(4)');
                new_order_price              = new_order_price_elem[0].textContent.split('.').join('').replace('Rp','').trim();
                console.log(new_order_price);
                var new_order_note_elem      = document.querySelectorAll('div.content-area > div > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td:nth-child(1) > div');
                new_order_note               = '';
                if(new_order_note_elem){
                    new_order_note           = new_order_note_elem[new_order_note_elem.length-1].textContent.trim().replace(',','_');
                    if (new_order_note === '') {
                        new_order_note = 'No note'
                    }
                } else {
                    new_order_note = 'No notes'
                }
                console.log(new_order_note);

                // push into array with only one item
                new_order_product_arr.push(new_order_product);
                new_order_product_url_arr.push(new_order_product_url);
                new_order_sku_arr.push(new_order_sku);
                new_order_pcs_arr.push(new_order_pc);
                new_order_price_arr.push(new_order_price);
                new_order_note_arr.push(new_order_note);
                console.log(new_order_sku_arr);
                console.log('check sku arry');
                console.log(new_order_sku_arr.length);
                var order_detail = {
                'plt'         : plt,
                'seller'      : seller,
                'order_number': new_order_number,
                'order_url'   : new_order_url,
                'buyer'       : new_order_consignees.textContent,
                'tel'         : new_order_tel,
                'add'         : new_order_add,
                'kurir'       : new_order_kurir,
                'resi'        : new_order_resi,
                'product'     : new_order_product,
                'product_link': new_order_product_url,
                'sku'         : new_order_sku,
                'item'        : new_order_item,
                'pc'          : new_order_pc,
                'price'       : new_order_price,
                'amount'      : new_order_amount,
                'shipping'    : new_order_shipping,
                'commission'  : new_order_commission,
                'income'      : new_order_pay,
                'time'        : new_order_time,
                'note'        : new_order_note,
                'status'      : '10' ,

                 // single product, also update as strings = all in one column
                'products'    : new_order_product,
                'product_links': new_order_product_url,
                'skus'        : new_order_sku,
                'pcs'         : new_order_pc,
                'prices'      : new_order_price,
                'notes'        : new_order_note,
                 // or one item in array
                'product_arr'       : new_order_product_arr,
                'product_link_arr'  : new_order_product_url_arr,
                'sku_arr'            : new_order_sku_arr,
                'pc_arr'            : new_order_pcs_arr,
                'note_arr'          : new_order_note_arr,
                'price_arr'          : new_order_price_arr,
                };
                console.log(order_detail);
                console.log(typeof order_detail);
                var tkpd_order_up = GM_xmlhttpRequest({
                    method  :           'POST',
                    url     :           'http://adakok.com/api/orders/',
                    headers :           { "Content-Type": "application/json; charset=utf-8"},
                    data    :           JSON.stringify(order_detail),
                    onreadystatechange: function(res){console.log(res.readyState)},
                    onload  :           function(res){console.log(res.responseText)},
                });
            }else{
                for(var i=1; i < order_rows.length; i++){
                    if(order_rows[i].childNodes.length > 6){
                        new_order_item         += 1;
                        // console.log(order_rows[i].childNodes);
                        var single_product      = order_rows[i].querySelector('td > a').textContent.replace(',','_');
                        new_order_product      += single_product + ' | ';
                        new_order_product_arr.push(single_product);
                        // new_order_product      += ' | ';
                        console.log("Array ->" + new_order_product_arr);
                        var single_product_url  = order_rows[i].querySelector('td > a').href.replace(',','_');
                        new_order_product_url  += single_product_url + ' | ';
                        new_order_product_url_arr.push(single_product_url);
                        // new_order_product_url  += ' | ';
                        console.log("Array ->"+ new_order_product_url_arr);
                        var single_sku          = order_rows[i].querySelectorAll('td > div')[0].textContent.replace('SKU - ','').trim().replace(',','_');
                        if (single_sku.length === 0) {
                            single_sku = 'No SKU'
                        }
                        new_order_sku          += single_sku + ' | ';
                        new_order_sku_arr.push(single_sku);
                        // new_order_sku          += ' | ';
                        console.log("Array ->" + new_order_sku_arr);
                        var notes_elem = order_rows[i].querySelectorAll('td > div')[3];
                        if(notes_elem){
                            var single_notes    = notes_elem.textContent.trim().replace(',','_');
                            if (single_notes === '') {
                                single_notes = 'No note'
                            }
                            new_order_notes    += single_notes + ' | ';
                            new_order_note_arr.push(single_notes);
                            // new_order_notes    += ' |  ';
                        }else{
                            new_order_notes    += 'No notes | ';
                            new_order_note_arr.push('No notes');
                        }
	                    console.log("Array ->"  + new_order_note_arr);
                        var single_pcs          = order_rows[i].querySelectorAll('td')[1].textContent.trim().replace(',','_');
                        new_order_pcs          += single_pcs + ' | ';
                        // new_order_pcs          += ' | ';
                        new_order_pcs_arr.push(single_pcs);
                        console.log("Array ->"  + new_order_pcs_arr);
                        var single_price        = order_rows[i].querySelectorAll('td')[3].textContent.split('.').join('').replace('Rp','').trim().replace(',','_');
                        new_order_price        += single_price + ' | ';
                        // new_order_price        += ' | ';
                        new_order_price_arr.push(single_price);
                        console.log("Array ->"  + new_order_price_arr);
                    }
                }
	            console.log(new_order_product);
	            if (new_order_product.endsWith(' | ')) {
		            new_order_product = new_order_product.slice(0, new_order_product.length - 3)
	            }
	            console.log(new_order_product);
                console.log(new_order_product_url);
	            if (new_order_product_url.endsWith(' | ')) {
		            new_order_product_url = new_order_product_url.slice(0, new_order_product_url.length - 3)
	            }
	            console.log(new_order_product_url);
                console.log(new_order_notes);
	            if (new_order_notes.endsWith(' | ')) {
		            new_order_notes = new_order_notes.slice(0, new_order_notes.length - 3)
	            }
	            console.log(new_order_notes);
                console.log(new_order_sku);
	            if (new_order_sku.endsWith(' | ')) {
		            new_order_sku = new_order_sku.slice(0, new_order_sku.length - 3)
	            }
	            console.log(new_order_sku);
                console.log(new_order_pcs);
	            if (new_order_pcs.endsWith(' | ')) {
		            new_order_pcs = new_order_pcs.slice(0, new_order_pcs.length - 3)
	            }
	            console.log(new_order_pcs);
                console.log(new_order_price);
	            if (new_order_price.endsWith(' | ')) {
		            new_order_price = new_order_price.slice(0, new_order_price.length - 3)
	            }
	            console.log(new_order_price);
                var order_details = {
                'plt'            : plt,
                'seller'         : seller,
                'order_number'   : new_order_number,
                'order_url'      : new_order_url,
                'buyer'          : new_order_consignees.textContent,
                'tel'            : new_order_tel,
                'add'            : new_order_add,
                'kurir'          : new_order_kurir,
                'resi'           : new_order_resi,
                'amount'         : new_order_amount,
                'shipping'       : new_order_shipping,
                'commission'     : new_order_commission,
                'income'         : new_order_pay,
                'time'           : new_order_time,
                'status'         : '10' ,
                    // update all in array
                'product_arr'       : new_order_product_arr,
                'product_link_arr'  : new_order_product_url_arr,
                'sku_arr'           : new_order_sku_arr,
                'item'              : new_order_item,
                'pc_arr'            : new_order_pcs_arr,
                'price_arr'         : new_order_price_arr,
                'note_arr'          : new_order_note_arr,
                    // update all in strings words
                'products'          : new_order_product,
                'product_links'     : new_order_product_url,
                'skus'              : new_order_sku,
                'pcs'               : new_order_pcs,
                'prices'            : new_order_price,
                'notes'             : new_order_notes,
                };
                console.log(order_details);
                console.log(typeof order_details);
                var tkpd_orders_up = GM_xmlhttpRequest({
                    method  :           'POST',
                    url     :           'http://adakok.com/api/orders/',
                    headers :           { "Content-Type": "application/json; charset=utf-8"},
                    data    :           JSON.stringify(order_details),
                    onreadystatechange: function(res){console.log(res.readyState)},
                    onload  :           function(res){console.log(res.responseText)},
                });
                 }
            var elem         = $("tr > td > table > tbody > tr > td > span")[1];
            var order_number = elem.textContent;
            console.log(order_number);
            var bc           = document.querySelector('td > img');
            bc.removeAttribute('src');
            bc.setAttribute('id','n');
            setTimeout(function(){$("#n").JsBarcode(new_order_number,{
                format: 'CODE128',
                lineColor: "#0aa",
                width: 20,
                height: 500,
                displayValue: false
            })},500) }

    };
})();
