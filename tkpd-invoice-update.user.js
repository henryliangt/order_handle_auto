// ==UserScript==
// @name         Tkpd invoice page Barcode + Order update
// @namespace    http://www.tiaria.id/
// @version      0.14
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
            var seller                       = document.querySelector('table > tbody > tr:nth-child(4) > td:nth-child(2) > a').textContent.trim();
            var new_order                    = '';
            var new_order_numbers_elem       =    $("tr > td > table > tbody > tr > td > span")[1];
            var new_order_number             = new_order_numbers_elem.textContent;
            var new_order_url                = window.location.href;
            console.log(new_order_url);
            var plt                          = new_order_url.split('//')[1].split('/')[0].split('.')[1];
            console.log(plt);
            var new_order_consignees         = document.querySelector('body > div.content-area > div > table > tbody > tr:nth-child(1) > td > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(2) > td > span');
            console.log(new_order_consignees.textContent);
            var new_order_contact_elem       =        document.querySelector('td:nth-child(2) > table > tbody > tr:nth-child(2) > td > div');     //tel add 3 in 1
            console.log(new_order_contact_elem.innerHTML.split('<br>')[0].trim());
            console.log(new_order_contact_elem.innerHTML.split('<br>')[1].trim());
            var new_order_add                = '';
            new_order_add                   += new_order_contact_elem.innerHTML.split('<br>')[0].trim();
            new_order_add                   += '..';
            new_order_add                   += new_order_contact_elem.innerHTML.split('<br>')[1].trim()
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
            // var new_order_amount =     document.querySelectorAll('table > tbody > tr:nth-child(4) > td:nth-child(2) > table > tbody > tr:nth-child(2) > td:nth-child(2)');
            // console.log(new_order_amount[0].textContent.split('.').join('').replace('Rp',''));
            var new_order_resi_elem          =       document.querySelector('tr:nth-child(2) > td:nth-child(1) > div:nth-child(3) > span');
            var new_order_resi               = '';
            if(new_order_resi_elem){
                new_order_resi               = new_order_resi_elem.textContent;console.log(new_order_resi);
            };
            var order_rows                   = document.querySelectorAll('body > div.content-area > div > table > tbody > tr:nth-child(2) > td > table > tbody > tr');
            var new_order_amount_elem        = order_rows[order_rows.length-1].querySelector('td:nth-child(2) > table > tbody > tr:nth-child(2) > td:nth-child(2)');
            var new_order_amount             = new_order_amount_elem.textContent.split('.').join('').replace('Rp','');
            console.log(new_order_amount.trim());
            if(order_rows.length < 5){
                var new_order_product_elem  = document.querySelectorAll('tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td:nth-child(1) > a');
                var new_order_product       = new_order_product_elem[0].textContent;
                var new_order_product_url   = new_order_product_elem[0].href;
                console.log(new_order_product_url);
                var new_order_sku_elem      = document.querySelectorAll('tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td:nth-child(1) > div:nth-child(2)');
                var new_order_sku = new_order_sku_elem[0].textContent.replace('SKU - ','').trim()
                console.log(new_order_sku);
                var new_order_pcs_elem      =        document.querySelectorAll('tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td:nth-child(2)');
                var new_order_pcs = new_order_pcs_elem[0].textContent.trim();
                console.log(new_order_pcs);
                var new_order_price_elem    = document.querySelectorAll('tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td:nth-child(4)');
                var new_order_price         = new_order_price_elem[0].textContent.split('.').join('').replace('Rp','').trim();
                console.log(new_order_price);

                var new_order_notes_elem    = document.querySelectorAll('div.content-area > div > table > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(2) > td:nth-child(1) > div');
                var new_order_notes         =  '';
                if(new_order_notes_elem){
                    var new_order_notes = new_order_notes_elem[new_order_notes_elem.length-1].textContent.trim();
                }
                console.log(new_order_notes);
                                   }else{
                    var new_order_product         = '';
                    var new_order_product_url     = '';
                    var new_order_notes           = '';
                    var new_order_sku             = '';
                    var new_order_pcs             = '';
                    var new_order_price           = '';
                    // console.log(order_rows);
                    var new_order_product_arr     = [];
                    var new_order_product_url_arr = [];
                    var new_order_notes_arr       = [];
                    var new_order_sku_arr         = [];
                    var new_order_pcs_arr         = [];
                    var new_order_price_arr       = [];


                    for(var i=1; i < order_rows.length; i++){
                        if(order_rows[i].childNodes.length > 6){
                            // console.log(order_rows[i].childNodes);
                            var single_product     = order_rows[i].querySelector('td > a').textContent;
                            new_order_product      += single_product + ' | ';
                            new_order_product_arr.push(single_product);
                            // new_order_product      += ' | ';
                            console.log(new_order_product + new_order_product_arr);
                            var single_product_url  = order_rows[i].querySelector('td > a').href
                            new_order_product_url  += single_product_url + ' | ';
                            new_order_product_url_arr.push(single_product_url);
                            // new_order_product_url  += ' | ';
                            console.log(new_order_product_url + new_order_product_url_arr);
                            var single_sku          = order_rows[i].querySelectorAll('td > div')[0].textContent.replace('SKU - ','').trim()
                            new_order_sku          += single_sku + ' | ';
                            new_order_sku_arr.push(single_sku);
                            // new_order_sku          += ' | ';
                            console.log(new_order_sku + new_order_sku_arr);
                            var notes_elem = order_rows[i].querySelectorAll('td > div')[3];
                            if(notes_elem){
                                var single_notes    = notes_elem.textContent.trim()
                                new_order_notes    += single_notes + ' | ';
                                new_order_notes_arr.push(single_notes);

                                // new_order_notes    += ' |  ';
                            };
                            console.log(new_order_notes + new_order_notes_arr);
                            var single_pcs          = order_rows[i].querySelectorAll('td')[1].textContent.trim()
                            new_order_pcs          += single_pcs + ' | ';
                            // new_order_pcs          += ' | ';
                            new_order_pcs_arr.push(new_order_pcs);
                            console.log(new_order_pcs + new_order_pcs_arr);
                            var single_price        = order_rows[i].querySelectorAll('td')[3].textContent.split('.').join('').replace('Rp','').trim()
                            new_order_price        += single_price + ' | ';
                            // new_order_price        += ' | ';
                            new_order_price_arr.push(single_price);
                            console.log(new_order_price + new_order_price_arr);
                         }
                     }
                 }
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
                'pcs'         : new_order_pcs,
                'price'       : new_order_price,
                'amount'      : new_order_amount,
                'shipping'    : new_order_shipping,
                'commission'  : new_order_commission,
                'income'      : new_order_pay,
                'time'        : new_order_time,
                'notes'       : new_order_notes,
                'status'      : '10' ,
            }
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
