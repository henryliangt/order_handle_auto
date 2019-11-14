// ==UserScript==
// @name         Order update
// @namespace    http://www.tiaria.id/
// @version      0.2
// @description  Updating tkpd order, insert bukalapak  tkpd order number barcode.
// @author       HL
// @connect      www.tiaria.id
// @connect      google.com
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

// @match        https://www.bukalapak.com/payment/transactions/print_preview*
// @updateURL    https://raw.githubusercontent.com/henryliangt/order_handle_auto/master/order_handle.meta.js
// @downloadURL  https://raw.githubusercontent.com/henryliangt/order_handle_auto/master/order_handle.user.js


// ==/UserScript==
(function() {
    'use strict';
    var stock_list, sku_elem, quantity,order_sku_amount = 'n/a' ;   //var for xml updating order list.
    window.onload=function(){
        console.log('on load');
        var get_update_order_url = 'https://script.google.com/a/tiaria.id/macros/s/AKfycbzli3fgBxQSlMXbuN3_BZZh0m6loc_TNXosJ-Xqhw7y/dev?';   //developement url.
   //   var get_update_order_url ='https://script.google.com/macros/s/AKfycbwRW9YKurbmJ_d6XbNanoYbWoX3LyIuc9xgaKqbS7ukjKbHQj2u/exec?';      //production url,
        var url = window.location.href;
        if(url.includes('https://www.bukalapak.com/payment/transactions/print_preview')){                                                              //handl bukapalak barcode
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
         }else if(window.location.href.includes('vendor.akulaku.com/#/index/')){                                    //handle akulaku order updating
                  console.log('AKULAKU-----');
                  var header = 'o=akulaku,';
                  var get_akulaku_order_list = GM_xmlhttpRequest({
                      method: 'GET',
                      url: 'http://vendor.akulaku.com/installment/api/json/vendor/pending/delivery/sales/order/list.do?offset=0&count=20&status=1',   // -1=preparing=proses pesanan order 6pcs , 1=pending order=menunggu 4pcs,
                      onreadystatechange: function(res){console.log('------>'+res.readyState)},
                      onload: function(res){ var r=JSON.parse(res.response);
                                             console.log(r.data.list);
                                             console.log(r.data.list.length);
                                             for(var i=4; i < r.data.list.length; i++){
                                               console.log(r.data.list[i]);
                                               console.log(r.data.list[i]['lineItemVOs2'][0]);
                                               var seller = r.data.list[i]['vendorName'] + ',';
                                               console.log(seller);
                                               var invoice_number = r.data.list[i]['invoiceNo'] + ',';
                                               console.log(invoice_number);
                                               var consignee = r.data.list[i]['customerName']+ ',';
                                               console.log(consignee);
                                               var tel = r.data.list[i]['customerPhone'] +',';
                                               console.log(tel);
                                               var add = r.data.list[i]['lineItemVOs2'][0].shippingAddress.replace(/,/g,'')+ ',';
                                               console.log(add);
                                               var kurir = '';
                                               if(r.data.list[i]['logistics']){
                                                  kurir+= r.data.list[i]['logistics']+','; }else{ kurir='akulaku,' }
                                                  console.log(kurir);
                                               var booking = '';
                                                  if(r.data.list[i]['trackingNumber']){ booking += r.data.list[i]['trackingNumber']+','   }else{  booking = 'na,'}
                                                  console.log(booking);
                                                // assume 1 sku.
                                               var product='', sku='', pcs='', price='';
                                               for(var j=0; j  < r.data.list[i]['lineItemVOs'].length; j++){
                                                    product += r.data.list[i]['lineItemVOs'][j]['itemName'].replace(/,|&/g,'');
                                                    sku +=  r.data.list[i]['lineItemVOs'][j]['vendorSkuId'];
                                                    pcs +=     r.data.list[i]['lineItemVOs'][j]['qty'];
                                                    price +=   r.data.list[i]['lineItemVOs'][j]['vendorPrice'];
                                                    if(j+1 < r.data.list[i]['lineItemVOs'].length ){
                                                        product+='_';
                                                        sku+='_';
                                                        pcs+='_';
                                                        price+='_';
                                                    }else{
                                                        product+=',';
                                                        sku+=',';
                                                        pcs+=',';
                                                        price+=',';
                                                        console.log(product);
                                                        console.log(sku);
                                                        console.log(pcs);
                                                        console.log(price);
                                                    }
                                                }//end of order sku loop.
                                                var amount =  r.data.list[i]['subTotal']+ ',';
                                                console.log(amount);
                                                var shipping_fee = r.data.list[i]['freightPrice']+ ',';
                                                console.log(shipping_fee);
                                                var commission =  '0,';
                                                console.log(commission);
                                                var pay =    r.data.list[i]['subTotal']+ ',';
                                                console.log(pay);
                                                var order_time =   r.data.list[i]['orderTime']+ ',';
                                                console.log(order_time);
                                                var notes =  r.data.list[i]['billingName']+ '_'+ r.data.list[i]['billingPhone']+'_'+ r.data.list[i]['email']+',';
                                                console.log(notes);
                                                header += seller+invoice_number+consignee+tel+add+kurir+booking+product+sku+pcs+price+amount+shipping_fee+commission+pay+order_time+notes;
                                                if(i+1<r.data.list.length){header+='&o=akulaku,'}

                                            } //end of for loop to download each order in the list.
                                            console.log('total holding orders= '+r.data.list.length+' new order= '+header.split('&').length);
                                            for(var k=0; k<header.split('&').length; k++){
                                                var updloading_akulaku_orders = GM_xmlhttpRequest({
                                                method:'GET',
                                                url:  get_update_order_url+header.split('&')[k],
                                                onreadystatechange: function(res) { console.log('--akulaku uploading state to:-->' + res.readyState +'_ skus per order = ' +j+' _this is order no._'+i); },
                                                onload: function(res) {
                                                     // Lets assume we updated it successfully...
                                                    console.log('success uploaded'+header.split('&')[k]);
                                                  },
                                                })  //end of xhr GET uploading orders.
                                            }

                                           } //end of onload action
                  })

 /*                 var seller = document.querySelector('div.sub-heading.pic-header-subtitle > span > strong').textContent.replace('&','') + ',';

                  var info = document.querySelectorAll('div.col-sm-6.col-md-6 > div.row.row-space > span');
                  var new_order_number = info[0].textContent + ',';
                  var new_order_consignee = info[2].textContent+ ',';
                  var new_order_tel = info[3].textContent+'-'+info[4].textContent + ',';
                  var new_order_add = document.querySelectorAll('#alamat-pengiriman > div > p')[0].textContent.replace(/,/g,'_')+ ',';
                  var new_order_kurir = '3PL'+ ',';
                  var new_order_booking =document.querySelectorAll('#package-number > span')[0].textContent + ',';
                  // assuem 1 sku.
                  var sku_info  = document.querySelectorAll('div.row.row-space > div.col-sm-7.col-md-7.col-val > span');
                  var new_order_product =    document.querySelectorAll('#prd-name > div > span')[0].textContent.replace(/&/g,'') + ',';
                  var new_order_sku =        document.querySelectorAll('#kode-sku > span')[0].textContent + ',';
                  var new_order_pcs =        document.querySelectorAll('#qty > span')[0].textContent + ',';
                  var new_order_price =      document.querySelectorAll('#harga-per-unit > div > span')[0].textContent.replace('Rp','').replace(',','').replace(',','') + ',';
                  var new_order_amount =     sku_info[2].textContent.replace('Rp','').replace(',','').replace(',','') + ',';
                  var new_order_shipping_fee = 15000 + ',';
                  var new_order_commission = '0.2 ,';
                  //          console.log(info);
                  //          console.log(new_order_amount);
                  //          console.log(sku_info);
                  var new_order_pay =        sku_info[2].textContent.replace('Rp','').replace(',','').replace(',','') + ',';
                  var new_order_time =       info[1].textContent + ',';
                  var new_order_notes =      info[info.length-1].textContent +' ,';
                  header += (seller+new_order_number + new_order_consignee + new_order_tel + new_order_add + new_order_kurir + new_order_booking);
                  header += (new_order_product + new_order_sku + new_order_pcs + new_order_price + new_order_amount);
                  header += (new_order_shipping_fee + new_order_commission + new_order_pay + new_order_time + new_order_notes);

                  console.log(header);
               var xhr_update_akulaku_order = GM_xmlhttpRequest({
                    method: "GET",
                    url: get_update_order_url+header,
                    onreadystatechange: function(res) {
                    console.log('--GM_XHR_GET_updating order Request state changed to:-->' + res.readyState);
                    },
                    onload: function(res) {
                        // Lets assume we updated it successfully...
                      console.log('res+ typeof response:'+ res + typeof res);
                        console.log('new_order=empty-->'+header);

                     }, });  //update all orders together. may need to change later.
*/

                  }else if(window.location.href.includes('sellercenter.zalora.co.id/order/index/order-detail')){                                    //handle Zalora
                  console.log('Zalora');
                  var header = 'o=zalora,';
                      setTimeout(function(){
                  var seller = document.querySelector('div.sc-switch-seller.sc-switch-seller--aligned > div').textContent.replace('&','').trim() + ',';
                  var info = document.querySelectorAll('table.table-details-vertical.left > tbody > tr > td');
                  var new_order_number = document.querySelector('div.main-headline-row.headline_elements_row > h1').textContent.split('Order No. ')[1].trim() + ',';
                  var new_order_consignee = info[1].textContent.trim().replace(',','')+ ',';
                  var new_order_tel = info[2].textContent.trim()+ ',';
            //      var new_order_add = document.querySelectorAll('address.details-vertical')[1].textContent.replace(/,/g,'_').trim()+ ',';  // with many br span,
                  var add = document.querySelectorAll('address.details-vertical > span');
                      var new_order_add= (add[4].textContent +' ' +add[5].textContent).replace(/,|&/g,'_').trim()+ ',';
                  var new_order_kurir = 'Zalora JNE,';
                  var new_order_booking =  'zalora JNE,';   //document.querySelectorAll('#package-number > span')[0].textContent + ',';
                  // assume 1 sku.
                      var new_order_product = '';
                      var new_order_sku ='';
                      var new_order_price ='' ;
                      var new_order_pcs =    '';
               for(var x=0; x < document.querySelectorAll('#itemsTable > tbody > tr > td.td5.cell-popover > div > span').length; x++){
                 //  var sku_info  = document.querySelectorAll('div.row.row-space > div.col-sm-7.col-md-7.col-val > span');
                  new_order_product += document.querySelectorAll('#itemsTable > tbody > tr > td.td7')[x].textContent.replace(',','').replace(/&/g,'').trim();
                  new_order_sku += document.querySelectorAll('#itemsTable > tbody > tr > td.td5.cell-popover > div > span')[x].textContent.trim();
                    //  document.querySelectorAll('#qty > span')[i].textContent + ',';
                  new_order_pcs +='1';
                  new_order_price +=   document.querySelectorAll('#itemsTable > tbody > tr > td.td9')[x].textContent.replace('.00','').replace('IDR','').replace(',','').replace(',','').trim();
                   if(x+1<document.querySelectorAll('#itemsTable > tbody > tr > td.td9').length){
                   new_order_product+='_';
                       new_order_sku+='_';
                       new_order_pcs+='_';
                       new_order_price+='_';
                   }else{ new_order_product+=',';
                       new_order_sku+=',';
                       new_order_pcs+=',';
                       new_order_price+=',';}
                   console.log(new_order_product+new_order_sku+new_order_pcs+new_order_price);
                  };
               var finance     = document.querySelectorAll('div.row-fluid.order-details > div > table.table-details-vertical.table-currency > tbody > tr > td');
              var pre_finance = document.querySelectorAll('table.table-details-vertical.table-currency > tbody > tr > td');

                             var new_order_amount =     '';
                             var new_order_shipping_fee = '';
                             var new_order_commission = '';
                          if(document.querySelectorAll('div.row-fluid.order-details > div > table.table-details-vertical.table-currency > tbody > tr > td').length>1){
                              console.log(finance.length);
                             new_order_amount +=     finance[0].textContent.replace('IDR','').replace(',','').replace(',','').replace('.00','').trim() + ',';
                             new_order_shipping_fee += finance[2].textContent.replace('IDR','').replace(',','').replace(',','').replace('.00','').trim() + ',';
                             new_order_commission += finance[1].textContent.replace('IDR','').replace(',','').replace(',','').replace('.00','').trim() + ',';
                          }else if(document.querySelectorAll('table.table-details-vertical.table-currency > tbody > tr > td').length > 1){
                              console.log(document.querySelectorAll('table.table-details-vertical.table-currency > tbody > tr > td').length);
                              //    new_order_amount = '1,';
                                new_order_amount = document.querySelector('div.span4 > div > div.span4 > table > tbody > tr:nth-child(1) > td').textContent.replace('IDR','').replace(',','').replace(',','').replace('.00','').trim() + ',';
                              //    new_order_shipping_fee = '1,';
                                new_order_shipping_fee = (25000+(document.querySelectorAll('#itemsTable > tbody > tr > td.td9').length-1)*5000).toString()+',';
                              //    new_order_commission = '1,';
                                new_order_commission = (parseInt(pre_finance[0].textContent.replace(',','').replace(',','').replace('.00','').trim())*0.25).toString() +',';
                                  }else{
                                       console.log('shit, no value at all, no money, man....')
                                   new_order_amount =  '0,';
                                   new_order_shipping_fee = '25000,';
                                   new_order_commission = '0,';

                                   }
                                    //          console.log(info);
                  //          console.log(new_order_amount);
                  //          console.log(sku_info);
                  var new_order_pay =        document.querySelectorAll('div.span4 > table > tbody > tr > td.cell-currency')[0].textContent.replace('IDR','').replace('.00','').replace(',','').replace(',','').trim() + ',';
                  var new_order_time =       info[0].textContent.trim() + ',';
                  var new_order_notes =      'n/a ,';
                  header += (seller+new_order_number + new_order_consignee + new_order_tel + new_order_add + new_order_kurir + new_order_booking);
                  header += (new_order_product + new_order_sku + new_order_pcs + new_order_price + new_order_amount);
                  header += (new_order_shipping_fee + new_order_commission + new_order_pay + new_order_time + new_order_notes);
                  console.log(get_update_order_url+header);
              var xhr_update_zalora_order = GM_xmlhttpRequest({
                    method: "GET",
                    url: get_update_order_url+header,
                    onreadystatechange: function(res) {
                    console.log('--GM_XHR_GET_updating order Request state changed to:-->' + res.readyState);
                    },
                    onload: function(res) {
                        // Lets assume we updated it successfully...
                      console.log('res+ typeof response:'+ res + typeof res);
                        console.log('new_order=empty-->'+header);

                     }, });  //update all orders together. may need to change later.
                      },1000)
                  }else if(window.location.href.includes('o-seller.jd.id/order/detail.do?orderId')){                                    //handle JD down...
                  console.log('JD');
                  var header = 'o=jd,tiaria,';
                      setTimeout(function(){
       //           var seller = document.querySelector('div.sc-switch-seller.sc-switch-seller--aligned > div').textContent.replace('&','').trim() + ',';
                  var info =  document.querySelectorAll('div:nth-child(2) > div.form-bd > div > span.cont');
                  var buyer = document.querySelectorAll('div:nth-child(3) > div.form-bd > div> span.cont');
                  var new_order_number = info[0].textContent.replace('Order No. ','').trim() + ',';
                          console.log(new_order_number);
                  var new_order_consignee = buyer[0].textContent.trim().replace(',','').replace(/,|&|=/g,'_').trim()+ ',';
                          console.log(new_order_consignee);
                  var new_order_tel = buyer[2].textContent.trim()+ ',';
                          console.log(new_order_tel);
            //      var new_order_add = document.querySelectorAll('address.details-vertical')[1].textContent.replace(/,/g,'_').trim()+ ',';  // with many br span,
                  var add = document.querySelectorAll('address.details-vertical > span');
                  var new_order_add= (buyer[1].textContent +' P.O ' +buyer[3].textContent).replace(/,|&|=/g,'_').trim()+ ',';
                          console.log(new_order_add);
                  var new_order_kurir = info[3].textContent.trim()+',';
                          console.log(new_order_kurir);
                  var new_order_booking =  'cs3,';
     /*             var shipping_elem = document.querySelectorAll('div:nth-child(4) > div.form-bd > div > span.cont');
                  if(shipping_elem[2]!==undefined & shipping_elem[2].textContent!==''){
                             new_order_booking += shipping_elem[2].textContent+',';
                          }else{new_order_booking += 'cs3,'};
     */             console.log(new_order_booking);
                          // assume 1 sku.
                      var new_order_product = '';
                      var new_order_sku ='';
                      var new_order_price ='' ;
                      var new_order_pcs =    '';
                var sku_info  = document.querySelectorAll('table > tbody > tr > td');
                var order_skus  = document.querySelectorAll('table > tbody > tr')
               for(var x=0; x < order_skus.length; x++){
                  new_order_product += document.querySelectorAll('a.name')[x].textContent.replace(',','').replace(/&|=/g,'').trim();
                  new_order_sku += document.querySelectorAll('div.text > p')[x].textContent.split('-SKU ：')[1];
                  console.log(new_order_sku +'==' + new_order_product);
                  new_order_pcs += sku_info[x*3+1].textContent;
                  new_order_price +=   sku_info[x*3+2].textContent.replace('.00','').replace('Rp ','').replace(',','').replace(',','').trim();
                   if(x+1<order_skus.length){
                   new_order_product+='_';
                       new_order_sku+='_';
                       new_order_pcs+='_';
                       new_order_price+='_';
                   }else{ new_order_product+=',';
                       new_order_sku+=',';
                       new_order_pcs+=',';
                       new_order_price+=',';}
                   console.log(new_order_product+new_order_sku+new_order_pcs+new_order_price);
                  };
               var finance     = document.querySelectorAll(' div.subtotal-wrap > div.line > span.cont');
      //        var pre_finance = document.querySelectorAll('table.table-details-vertical.table-currency > tbody > tr > td');

                             var new_order_amount =     '';
                             var new_order_shipping_fee = '';
                             var new_order_commission = '0.1,';
                             console.log(finance.length);
                             new_order_amount +=     finance[0].textContent.replace('Rp ','').replace(',','').replace(',','').replace('.00','').trim() + ',';
                             new_order_shipping_fee += finance[4].textContent.replace('Rp ','').replace(',','').replace(',','').replace('.00','').trim() + ',';
                  //          console.log(info);
                  //          console.log(new_order_amount);
                  //          console.log(sku_info);
                  var new_order_pay =        finance[finance.length-1].textContent.replace('Rp ','').replace('.00','').replace(',','').replace(',','').trim() + ',';
                  var new_order_time =       info[2].textContent.trim() + ',';
                  var new_order_notes =      '_  ';
                  new_order_notes+=buyer[buyer.length-1].textContent.replace(',','').replace(/,|&|=/g,'').trim()+',';
                  header += (new_order_number + new_order_consignee + new_order_tel + new_order_add + new_order_kurir + new_order_booking);
                  header += (new_order_product + new_order_sku + new_order_pcs + new_order_price + new_order_amount);
                  header += (new_order_shipping_fee + new_order_commission + new_order_pay + new_order_time + new_order_notes);
                  console.log(get_update_order_url+header);
              var xhr_update_jd_order = GM_xmlhttpRequest({
                    method: "GET",
                    url: get_update_order_url+header,
                    onreadystatechange: function(res) {
                    console.log('--GM_XHR_GET_updating order Request state changed to:-->' + res.readyState);
                    },
                    onload: function(res) {
                        // Lets assume we updated it successfully...
                      console.log('res+ typeof response:'+ res + typeof res);
                        console.log('new_order=empty-->'+header);

                     }, });  //update all orders together. may need to change later.
                      },1000)                                                                                                                                    // handle jd up..
                  }else if(window.location.href.includes('https://merchant.blibli.com/MTA/neo/order/order-detail/?orderNo')){                                    //handl blibli order updating
                  console.log('blibli');
                  var header = 'o=blibli,';
                  var seller = document.querySelector('div.sub-heading.pic-header-subtitle > span > strong').textContent.replace('&','') + ',';

                  var info = document.querySelectorAll('div.col-sm-6.col-md-6 > div.row.row-space > span');
                  var new_order_number = info[0].textContent + ',';
                  var new_order_consignee = info[2].textContent+ ',';
                  var new_order_tel = info[3].textContent+'-'+info[4].textContent + ',';
                  var new_order_add = document.querySelectorAll('#alamat-pengiriman > div > p')[0].textContent.replace(/,/g,'_')+ ',';
                  var new_order_kurir = '3PL'+ ',';
                  var new_order_booking =document.querySelectorAll('#package-number > span')[0].textContent + ',';
                  // assuem 1 sku.
                  var sku_info  = document.querySelectorAll('div.row.row-space > div.col-sm-7.col-md-7.col-val > span');
                  var new_order_product =    document.querySelectorAll('#prd-name > div > span')[0].textContent.replace(/&/g,'') + ',';
                  var new_order_sku =        document.querySelectorAll('#kode-sku > span')[0].textContent + ',';
                  var new_order_pcs =        document.querySelectorAll('#qty > span')[0].textContent + ',';
                  var new_order_price =      document.querySelectorAll('#harga-per-unit > div > span')[0].textContent.replace('Rp','').replace(',','').replace(',','') + ',';
                  var new_order_amount =     sku_info[2].textContent.replace('Rp','').replace(',','').replace(',','') + ',';
                  var new_order_shipping_fee = 15000 + ',';
                  var new_order_commission = '0.2 ,';
                  //          console.log(info);
                  //          console.log(new_order_amount);
                  //          console.log(sku_info);
                  var new_order_pay =        sku_info[2].textContent.replace('Rp','').replace(',','').replace(',','') + ',';
                  var new_order_time =       info[1].textContent + ',';
                  var new_order_notes =      info[info.length-1].textContent +' ,';
                  header += (seller+new_order_number + new_order_consignee + new_order_tel + new_order_add + new_order_kurir + new_order_booking);
                  header += (new_order_product + new_order_sku + new_order_pcs + new_order_price + new_order_amount);
                  header += (new_order_shipping_fee + new_order_commission + new_order_pay + new_order_time + new_order_notes);

                  console.log(header);
               var xhr_update_blibli_order = GM_xmlhttpRequest({
                    method: "GET",
                    url: get_update_order_url+header,
                    onreadystatechange: function(res) {
                    console.log('--GM_XHR_GET_updating order Request state changed to:-->' + res.readyState);
                    },
                    onload: function(res) {
                        // Lets assume we updated it successfully...
                      console.log('res+ typeof response:'+ res + typeof res);
                        console.log('new_order=empty-->'+header);

                     }, });  //update all orders together. may need to change later.


                  }else if (url.includes('tokopedia.com/invoice.pl?id')){                                                                            //handl tkpd barcode generate
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
             })},500)
         }else if(window.location.href.includes('seller.tokopedia.com/myshop_order')){                                                                                                   //handle tkpd order updating down
            console.log(' yes, seller.tokopedia.com/myshop_order included,,, starting XHR download stock now....');
  /*          var stock_list_xhr = GM_xmlhttpRequest({
                method: "GET",
                url: 'https://script.google.com/macros/s/AKfycbxFDzosHE4xfVdbkbR7ixdjg3zsSyQE-ZTAcg6equ5qDKzZnS7v/exec',   //version 1, simple test , get stock_list done.
                onreadystatechange: function(res) {
                    console.log('------GM_XHR Request state changed to:------>>>>' + res.readyState);
                    },
                onload: function(res) {
                    // Lets assume we get JSON back...
                    document.querySelector('div.css-1to6rv9 > span').textContent = res.response.slice(0,20);
                    stock_list = res.response;
                    stock_list = stock_list.split(',')
                    sku_elem = document.querySelectorAll('div.product-list__name-wrapper.mb-8 > span');
                    for(var i=0; i<sku_elem.length; i++){
                        console.log(' ----------->real find');
                        var order = sku_elem[i].textContent;
                        var order_sku = sku_elem[i].textContent.split(' - ')[1];
                        order_sku_amount = stock_list[(stock_list.indexOf(order_sku)+1)];
                        order = order.replace('SKU', order_sku_amount);
                        sku_elem[i].textContent = order;
                        sku_elem[i].style="font-size:150%; color:black; font-family:verdana;"   }; },});
    */      setTimeout(function(){
                          //update current order to system.
              console.log(' start updating orders now....');
              var header = 'o=tokopedia,';
              var seller = document.querySelector('span.s-shop__name > a').textContent;
              header+=seller;
              header+=',';
              var new_order = '';
              var new_order_numbers =    document.querySelectorAll('div.info > div.order-summary-wrapper > a');
              var new_order_consignees = document.querySelectorAll('div.buyer-name');
              var new_order_tel =        document.querySelectorAll('div.col.col--address.big-gutters > div:nth-child(1) > div');     //tel add 3 in 1
              var new_order_kurir =      document.querySelectorAll('div.col.col--shipping.big-gutters > div > span');             //actual find 100, 2/4.. works .. this may skip Harus sesua: div.col.col--shipping.big-gutters > div.section > span:nth-child(3)
              var new_order_booking =    document.querySelectorAll('div.section >  span:nth-child(5)');                           //maybe no booking
              var new_order_resi =       document.querySelectorAll('section.css-1yy85lw-unf-card.eyk31ek0 > div:nth-child(2) > div:nth-child(2) > div:nth-child(2)')
              var new_order_product =    document.querySelectorAll('div.u-row.product-list > div.product-list__name-wrapper.mb-8 > a');
              var new_order_sku =        document.querySelectorAll('div.product-list__name-wrapper.mb-8 > span.product-list__sku');   //maybe no sku code
              var new_order_pcs =        document.querySelectorAll('div.product-list__count > span:nth-child(1)');
              var new_order_price =      document.querySelectorAll('div.product-list__name-wrapper.mb-8 > div > span.text-gray > span');
              var new_order_amount =     document.querySelectorAll('div.col.col--pricing.big-gutters > span.total-price');
              var new_order_shipping_fee = document.querySelectorAll('div.section > span:nth-child(3) > span.text-gray');
              var new_order_commission = '0';
              var new_order_pay =        document.querySelectorAll('div.col.col--pricing.big-gutters > span.total-price');
              var new_order_time =       document.querySelectorAll('div.info > div.order-summary-wrapper > span.order-date');
              var new_order_notes =      document.querySelectorAll('i.product-list__note');

              for(var j=0; j<document.querySelectorAll('section.css-1yy85lw-unf-card').length; j++){
                    GM_log(j);
                    new_order+=header;
                    new_order+=(new_order_numbers[j].textContent + ',');                 //Order number
                    console.log('order number = '+new_order_numbers[j].textContent);
                    new_order+=(new_order_consignees[j].textContent + ',');              //Consignee
                    console.log(new_order_consignees[j].textContent);
                    new_order+=(new_order_tel[j].innerHTML.split('<br>')[2] + ',');     //Get telephone number
            //        console.log(new_order);
                    new_order+=(new_order_tel[j].innerHTML.split('<br>')[1].replace(/,/g,'_') + ',');    //Address
           //         console.log('tel address + ='+new_order);
            //        new_order+=(new_order_kurir[j].textContent.replace(/(|)/g,'') + ',');
                    GM_log(j*2+1);
                    console.log(new_order_kurir[j*2+1]);
                    console.log(new_order_kurir[j*2+1].childElementCount);
                    console.log(new_order_kurir[j*2+1].textContent);
                    console.log(new_order_kurir[j*2+1].querySelector('span.text-gray').textContent.replace('(Rp ','').replace('.','').replace(')',''));
                    console.log(new_order_kurir[j*2+1].firstChild);
                    console.log(new_order_kurir[j*2+1].lastChild);
                    new_order+=(new_order_kurir[j*2+1].firstChild.textContent + ',');          //shipping kurir. trunction words, see  more situation
                    console.log('shipping kurir = '+new_order_kurir[j*2+1].firstChild.textContent);
                    //shipping booking code by different kurir
                  if(window.location.href.includes('myshop_order?status=confirm_shipping')){                                                                             // tkpd order_kurir_booking updating in confirm_shipping page
                      if(new_order_kurir[j*2+1].textContent.includes('JNE')){                     //if jne , get jne booking
                        if(new_order_booking[j]){
                        new_order+=(new_order_booking[j].textContent + ',')}
                      }else if(new_order_kurir[j*2+1].textContent.includes('Ninja')){           // if ninjia, no booking
                        new_order+='Ninja?,';
                      }else{                                                                //if other? list more situation
                        new_order+='Try again,';
                      };
                  }else if(window.location.href.includes('myshop_order?status=in_shipping')){                                                                           // tkpd order resi updating in_shipping page
                      if(new_order_resi[j]){
                       //    new_order+=new_order_resi[j].textContent.slice(10,) + ',';
                           console.log(new_order_resi[j].textContent.slice(10,));
                           new_order+=new_order_resi[j].innerHTML.split('<br>')[1].replace(/span>|<|\//g,'') + ',';
                           console.log(new_order_resi[j].innerHTML.split('<br>')[1].replace(/span>|<|\//g,''));    // 2 mehtod get Nomor Resi in shipped page.
                  };}else{                                                                                                                                       // tkpd new order/delivered order resi updating in_shipping page
                           new_order+='resi ? booking,'
                           }
           //         console.log(new_order);
                    //assume only 1 pcs in a order.                 need to list more products possibility
                    new_order+=new_order_product[j].textContent.replace('&',' ') + ',';                  //product name
                    console.log(new_order_product[j].textContent);
                    if(new_order_sku[j]){                               //sku code, maybe no have.
                        new_order+=new_order_sku[j].textContent.replace('SKU - ','')+',';
                    }else{
                        new_order+='no sku code,'
                    };
          //        console.log(new_order);
                  new_order+=(new_order_pcs[j].textContent.slice(0, new_order_pcs[j].textContent.indexOf('barang')) + ',');   //pcs.
                  console.log('pcs  ='+new_order_pcs[j].textContent);
                  new_order+=(new_order_price[j].textContent.slice(2,).split('.').join('') + ',');          //product unit price.
                  console.log(new_order_price[j].textContent);
                  //no matter what order, always 1 situation.
                  new_order+=(new_order_amount[j].textContent.slice(2,).split('.').join('') + ',');       //product total pay
                  console.log(new_order_amount[j].textContent);
       //           new_order+=new_order_shipping_fee[j].textContent.slice(4,-1).split('.').join('')+ ',';  //shipping cost, not work in suda process orders.
        //          console.log(new_order_shipping_fee[j].textContent);                                                                                //2 method get shipping cost.
                  new_order+=new_order_kurir[j*2+1].querySelector('span.text-gray').textContent.replace('(Rp ','').replace('.','').replace(')','')+ ',';   //shipping cost, working in to confirm and sudah done page.
       //           console.log(new_order_shipping_fee[j].textContent);
                  new_order+=new_order_kurir[j*2+1].querySelector('span.text-gray').textContent.replace(/(Rp |.|)/g,'');
                  new_order+=new_order_commission + ',';                                                  //commission
         //         console.log(new_order);
                  new_order+=new_order_pay[j].textContent.slice(2,).split('.').join('') + ',';           //total pay, per invoice bill
                  console.log(new_order_pay[j].textContent);
                  new_order+=new_order_time[j].textContent + ',';                                      //order time
                  console.log(new_order_time[j].textContent);
                  new_order+=new_order_notes[j].textContent.replace(/"|&|,/g,'');                         //notes, should be per product level.?
                  console.log(new_order_notes[j].textContent);
                  // GET order updating
                 var url='https://script.google.com/a/tiaria.id/macros/s/AKfycbzli3fgBxQSlMXbuN3_BZZh0m6loc_TNXosJ-Xqhw7y/dev?';   //developement url.
            //   var url='https://script.google.com/macros/s/AKfycbwRW9YKurbmJ_d6XbNanoYbWoX3LyIuc9xgaKqbS7ukjKbHQj2u/exec?';      //production url,
            //     url+=new_order;
           //      console.log(url);

                  //GET order updating done.
                  // only for many order updating
                  if(j+1 < new_order_numbers.length){
                      new_order+='&';
                      GM_log(new_order);
                     }GM_log(new_order);
              }//<--end of for loop get all orders.
            //    console.log(new_order);
                console.log('all orders to upload, listed below:')
                function length_test(value){
                    return value.length > 25
                }
                var verify_new_order = new_order.split('&').filter(length_test)
                console.log(new_order.split('&'));
                for(var m=0; m< new_order.split('&').length; m++){
                   console.log(new_order.split('&')[m]);
                }
                console.log(verify_new_order);
                for(var x=0; x< verify_new_order.length; x++){
                   console.log(verify_new_order[x]);
                }
                new_order = verify_new_order.toString();
                console.log(new_order.split('&'));
        //update all orders in 1 shot. may need to change later.
/*
                 var xhr_update_order = GM_xmlhttpRequest({                                                                                                          // send up tkpd orders  after collecting.
                    method: "GET",
                    url: url+new_order,
                    onreadystatechange: function(res) {
                       console.log('--GM_XHR_GET_updating order Request state changed to:-->' + res.readyState);
                       console.log(url+new_order);
                    },
                    onload: function(res) {
                        // Lets assume we updated it successfully...
                       console.log('res+ typeof response:'+ res + typeof res);
                       console.log(url+new_order);

                     }, });  //update all orders together. may need to change later.

*/
       // use a for loop to update all orders 1 by 1.


          //  console.log(new_order.split('&'));
               setTimeout(function(){
                   for(var k=0; k < verify_new_order.length; k++){
                      console.log('k is: = '+k);
                      console.log(url+verify_new_order[k]);
                      var xhr_update_order = GM_xmlhttpRequest({
                        method: "GET",
                        url: url+verify_new_order[k],
                        onreadystatechange: function(res) {
                        console.log('--GM_XHR_GET_updating order Request state changed to:-->' + res.readyState);
                        },
                   //     onload: function(res) { console.log('res+ typeof response:'+ res + typeof res); console.log('new_order=empty-->'+verify_new_order.split[k]);},  //assume uploaded success
                        onload: stock_down,



                         });}},1000)
     //    }; //end of for loop to upload       //end of the for loop

          function stock_down(){
              console.log(' yes, seller.tokopedia.com/myshop_order included,,, starting XHR download stock now....');
            var stock_list, sku_elem, quantity,order_sku_amount = 'n/a';
            var stock_url_dev='https://script.google.com/a/tiaria.id/macros/s/AKfycbxsdCOuVIFMpYaM3qerTZDUgdDskDiD8bQ5_NAQ0CAP/dev';   //var for xml updating order list.
            var stock_list_xhr = GM_xmlhttpRequest({
                method: "GET",
      //          url: stock_url_dev,
                url: 'https://script.google.com/macros/s/AKfycbxFDzosHE4xfVdbkbR7ixdjg3zsSyQE-ZTAcg6equ5qDKzZnS7v/exec',   //version 1, simple test , get stock_list done.
                onreadystatechange: function(res) {
                    console.log('------GM_XHR Request state changed to:------>>>>' + res.readyState);
                    },
                onload: function(res) {
                    // Lets assume we get JSON back...

                    document.querySelector('div.css-1to6rv9 > span').textContent = res.response.slice(0,20);
                    stock_list = res.response;
                    stock_list = stock_list.split(',');
                    console.log(stock_list);
                    sku_elem = document.querySelectorAll('div.product-list__name-wrapper.mb-8 > span');
                    for(var i=0; i<sku_elem.length; i++){
                        console.log(' ----------->real find');
                        var order = sku_elem[i].textContent;
                        var order_sku = sku_elem[i].textContent.split(' - ')[1];
                        order_sku_amount = stock_list[(stock_list.indexOf(order_sku)+1)];
                        order = order.replace('SKU', order_sku_amount);
                        sku_elem[i].textContent = order;
                        sku_elem[i].style="font-size:150%; color:black; font-family:verdana;"   }; },});
}



              console.log('-------======------++++++');
        //      console.log(new_order);
                }, 1000)


         }else if(1===2){
         console.log('new code in here.');
         }

    };
})();
