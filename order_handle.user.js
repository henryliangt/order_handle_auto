// ==UserScript==
// @name         Tokopedia Bukalapak order barcode &tkpd order update.
// @namespace    http://www.tiaria.id/
// @version      0.15
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
// @match        https://www.bukalapak.com/payment/transactions/print_preview*
// @updateURL    https://raw.githubusercontent.com/henryliangt/order_handle_auto/master/order_handle.meta.js
// @downloadURL  https://raw.githubusercontent.com/henryliangt/order_handle_auto/master/order_handle.user.js


// ==/UserScript==
(function() {
    'use strict';
    var stock_list, sku_elem, quantity,order_sku_amount = 'n/a' ;   //var for xml updating order list.
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
         }else if (url.includes('tokopedia.com/invoice.pl?id')){
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
         }else if(window.location.href.includes('seller.tokopedia.com/myshop_order')){
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
                  if(window.location.href.includes('myshop_order?status=confirm_shipping')){
                      if(new_order_kurir[j*2+1].textContent.includes('JNE')){                     //if jne , get jne booking
                        if(new_order_booking[j]){
                        new_order+=(new_order_booking[j].textContent + ',')}
                      }else if(new_order_kurir[j*2+1].textContent.includes('Ninja')){           // if ninjia, no booking
                        new_order+='Ninja?,';
                      }else{                                                                //if other? list more situation
                        new_order+='Try again,';
                      };
                  }else if(window.location.href.includes('myshop_order?status=in_shipping')){
                      if(new_order_resi[j]){
                       //    new_order+=new_order_resi[j].textContent.slice(10,) + ',';
                           console.log(new_order_resi[j].textContent.slice(10,));
                           new_order+=new_order_resi[j].innerHTML.split('<br>')[1].replace(/span>|<|\//g,'') + ',';
                           console.log(new_order_resi[j].innerHTML.split('<br>')[1].replace(/span>|<|\//g,''));    // 2 mehtod get Nomor Resi in shipped page.
                  };}else{
                           new_order+='resi ? booking,'
                           }
           //         console.log(new_order);
                    //assume only 1 pcs in a order.                 need to list more products possibility
                    new_order+=new_order_product[j].textContent + ',';                  //product name
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
                  new_order+=new_order_notes[j].textContent.replace(/"|,/g,'');                         //notes, should be per product level.?
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
                     }
              }//<--end of for loop get all orders.
            //    console.log(new_order);
                console.log(new_order.split('&'));
                console.log(new_order.split('&')[0]);
        //update all orders together. may need to change later.
               var xhr_update_order = GM_xmlhttpRequest({
                    method: "GET",
                    url: url+new_order,
                    onreadystatechange: function(res) {
                    console.log('--GM_XHR_GET_updating order Request state changed to:-->' + res.readyState);
                    },
                    onload: function(res) {
                        // Lets assume we updated it successfully...
                      console.log('res+ typeof response:'+ res + typeof res);
                        new_order='';
                        console.log('new_order=empty-->'+new_order);

                     }, });  //update all orders together. may need to change later.


    /*   // use a for loop to update all orders one by one.
           for(var k=0; k < new_order.split('&').length; k++){
               console.log(url+new_order.split('&')[k]);
                var xhr_update_order = GM_xmlhttpRequest({
                    method: "GET",
                    url: url+new_order.split('&')[k],
                    onreadystatechange: function(res) {
                    console.log('--GM_XHR_GET_updating order Request state changed to:-->' + res.readyState);
                    },
                    onload: function(res) {
                        // Lets assume we updated it successfully...
                      console.log('res+ typeof response:'+ res + typeof res);
                        new_order='';
                        console.log('new_order=empty-->'+new_order);

                     }, });     }; //end of for loop to upload      */  //end of the for loop

              console.log('-------======------++++++');
        //      console.log(new_order);
                }, 1000)
}else if(1===2){
         console.log('new code in here.');
         }

    };
})();
